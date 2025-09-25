'use client';

import React from 'react';
import Card from '../ui/card';
import Button from '../ui/button';
import type { FormState } from '../../domain/schema';

export type OutputPayload = {
  tos_markdown: string;
  privacy_markdown: string;
  tos_html: string;       // may be empty/undefined from API in some builds
  privacy_html: string;   // may be empty/undefined from API in some builds
  notes?: string;
};

type Props = { state: FormState; out: OutputPayload | null };

// -------- helpers (no deps) --------
const safe = (v: unknown): string => (typeof v === 'string' ? v : '');

const escapeHtml = (input: string): string =>
  input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const buildHtmlDoc = (title: string, markdown: string): string => {
  // dependency-free markdown fallback: escape and render in <pre>
  const body = `<pre>${escapeHtml(markdown || '').trim()}</pre>`;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>${title}</title>
<style>
  :root { color-scheme: light dark; }
  body {
    margin: 2rem auto;
    max-width: 800px;
    padding: 0 1rem;
    font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji;
    line-height: 1.6;
  }
  h1,h2,h3 { line-height: 1.25; }
  pre { white-space: pre-wrap; word-wrap: break-word; font: inherit; }
  .meta { color: #666; font-size: .9rem; margin-bottom: 1rem; }
</style>
</head>
<body>
  <div class="meta">${new Date().toISOString()}</div>
  ${body}
</body>
</html>`;
};

const normalizeName = (appName?: string) =>
  (appName || 'app').trim().replace(/\s+/g, '-');

const download = (name: string, content: string, type = 'text/markdown;charset=utf-8') => {
  if (!content || !content.trim()) {
    alert('Nothing to download yet.');
    return;
  }
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};

// -----------------------------------

export default function OutputPanel({ state, out }: Props) {
  const appSlug = normalizeName(state?.appName);

  // Safely extract content
  const privacyMd = safe(out?.privacy_markdown);
  const tosMd = safe(out?.tos_markdown);
  const privacyHtmlRaw = safe(out?.privacy_html);
  const tosHtmlRaw = safe(out?.tos_html);

  // If API did not return HTML, synthesize from markdown (never "undefined")
  const privacyHtml =
    privacyHtmlRaw.trim() ||
    buildHtmlDoc(`${appSlug} — Privacy Policy`, privacyMd);

  const tosHtml =
    tosHtmlRaw.trim() ||
    buildHtmlDoc(`${appSlug} — Terms of Service`, tosMd);

  const hasAny = Boolean(out);
  const hasPrivacyMd = Boolean(privacyMd && privacyMd.trim());
  const hasTosMd = Boolean(tosMd && tosMd.trim());

  return (
    <Card>
      <h2 className="mb-3 text-lg font-semibold">Output</h2>

      {!hasAny ? (
        <p className="text-sm text-gray-600">
          No drafts yet. Fill the form and click <strong>Generate Drafts</strong>.
        </p>
      ) : (
        <div className="grid gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <Button
              onClick={() =>
                download(`${appSlug}-privacy.md`, privacyMd)
              }
              disabled={!hasPrivacyMd}
            >
              Download Privacy (.md)
            </Button>
            <Button
              onClick={() =>
                download(
                  `${appSlug}-privacy.html`,
                  privacyHtml,
                  'text/html;charset=utf-8'
                )
              }
              disabled={!hasPrivacyMd && !privacyHtmlRaw.trim()}
            >
              Download Privacy (.html)
            </Button>
            <Button
              onClick={() =>
                download(`${appSlug}-tos.md`, tosMd)
              }
              disabled={!hasTosMd}
            >
              Download ToS (.md)
            </Button>
            <Button
              onClick={() =>
                download(
                  `${appSlug}-tos.html`,
                  tosHtml,
                  'text/html;charset=utf-8'
                )
              }
              disabled={!hasTosMd && !tosHtmlRaw.trim()}
            >
              Download ToS (.html)
            </Button>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-3 text-xs text-gray-700">
            <div className="mb-1 font-semibold">Notes</div>
            <pre className="whitespace-pre-wrap">{safe(out?.notes) || '—'}</pre>
          </div>

          <div className="rounded-2xl border border-gray-200">
            <div className="bg-gray-100 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-gray-600">
              Privacy Policy (Markdown)
            </div>
            <div className="max-h-64 overflow-auto p-3 text-sm">
              {hasPrivacyMd ? (
                <pre className="whitespace-pre-wrap">{privacyMd}</pre>
              ) : (
                <p className="text-gray-500">No Privacy Policy generated yet.</p>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200">
            <div className="bg-gray-100 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-gray-600">
              Terms of Service (Markdown)
            </div>
            <div className="max-h-64 overflow-auto p-3 text-sm">
              {hasTosMd ? (
                <pre className="whitespace-pre-wrap">{tosMd}</pre>
              ) : (
                <p className="text-gray-500">No Terms of Service generated yet.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
