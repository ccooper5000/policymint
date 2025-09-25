'use client';

import React from 'react';

type OutputPanelProps = {
  // Raw markdown strings coming from the API response
  tos_markdown?: string | null;
  privacy_markdown?: string | null;

  // Optional for nicer file names/titles
  appName?: string | null;
};

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function buildHtmlDocument(title: string, markdown: string): string {
  // We keep it dependency-free: no client CDN, no markdown lib.
  // Render markdown text inside <pre> with sensible defaults.
  const safe = escapeHtml(markdown);
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
  pre {
    white-space: pre-wrap;
    word-wrap: break-word;
    font: inherit;
  }
  .meta { color: #666; font-size: .9rem; margin-bottom: 1rem; }
</style>
</head>
<body>
  <div class="meta">${new Date().toISOString()}</div>
  <pre>${safe}</pre>
</body>
</html>`;
}

function downloadHtml(filename: string, html: string) {
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export default function OutputPanel({
  tos_markdown,
  privacy_markdown,
  appName,
}: OutputPanelProps) {
  const app = (appName || 'PolicyMint').trim().replace(/\s+/g, '-');

  const hasTos = typeof tos_markdown === 'string' && tos_markdown.trim().length > 0;
  const hasPrivacy = typeof privacy_markdown === 'string' && privacy_markdown.trim().length > 0;

  const handleDownloadTos = () => {
    if (!hasTos) {
      alert('No Terms of Service content available to download.');
      return;
    }
    const html = buildHtmlDocument(`${app} — Terms of Service`, tos_markdown!.trim());
    downloadHtml(`${app}-Terms-of-Service.html`, html);
  };

  const handleDownloadPrivacy = () => {
    if (!hasPrivacy) {
      alert('No Privacy Policy content available to download.');
      return;
    }
    const html = buildHtmlDocument(`${app} — Privacy Policy`, privacy_markdown!.trim());
    downloadHtml(`${app}-Privacy-Policy.html`, html);
  };

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* TOS Panel */}
        <div className="rounded-xl border border-border p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Terms of Service</h2>
            <button
              type="button"
              onClick={handleDownloadTos}
              disabled={!hasTos}
              className={`inline-flex items-center rounded-md px-3 py-2 text-sm font-medium border transition
                ${hasTos ? 'bg-primary text-primary-foreground hover:opacity-90'
                         : 'bg-muted text-muted-foreground opacity-60 cursor-not-allowed'}
              `}
            >
              Download HTML
            </button>
          </div>
          <div className="min-h-[200px] rounded-md bg-muted/40 p-3 text-sm leading-6 overflow-auto">
            {hasTos ? (
              <pre className="whitespace-pre-wrap">{tos_markdown}</pre>
            ) : (
              <p className="text-muted-foreground">No Terms of Service generated yet.</p>
            )}
          </div>
        </div>

        {/* Privacy Panel */}
        <div className="rounded-xl border border-border p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Privacy Policy</h2>
            <button
              type="button"
              onClick={handleDownloadPrivacy}
              disabled={!hasPrivacy}
              className={`inline-flex items-center rounded-md px-3 py-2 text-sm font-medium border transition
                ${hasPrivacy ? 'bg-primary text-primary-foreground hover:opacity-90'
                             : 'bg-muted text-muted-foreground opacity-60 cursor-not-allowed'}
              `}
            >
              Download HTML
            </button>
          </div>
          <div className="min-h-[200px] rounded-md bg-muted/40 p-3 text-sm leading-6 overflow-auto">
            {hasPrivacy ? (
              <pre className="whitespace-pre-wrap">{privacy_markdown}</pre>
            ) : (
              <p className="text-muted-foreground">No Privacy Policy generated yet.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
