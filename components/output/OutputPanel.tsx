'use client';

import React from 'react';
import Card from '../ui/card';
import Button from '../ui/button';
import type { FormState } from '../../domain/schema';

export type OutputPayload = {
  tos_markdown: string;
  privacy_markdown: string;
  tos_html: string;
  privacy_html: string;
  notes?: string;
};

export default function OutputPanel({ state, out }: { state: FormState; out: OutputPayload | null }) {
  const download = (name: string, content: string, type = 'text/markdown;charset=utf-8') => {
    const blob = new Blob([content], { type });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <Card>
      <h2 className="mb-3 text-lg font-semibold">Output</h2>
      {!out ? (
        <p className="text-sm text-gray-600">
          No drafts yet. Fill the form and click <strong>Generate Drafts</strong>.
        </p>
      ) : (
        <div className="grid gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <Button onClick={() => download(`${state.appName || 'app'}-privacy.md`, out.privacy_markdown)}>
              Download Privacy (.md)
            </Button>
            <Button onClick={() => download(`${state.appName || 'app'}-privacy.html`, out.privacy_html, 'text/html;charset=utf-8')}>
              Download Privacy (.html)
            </Button>
            <Button onClick={() => download(`${state.appName || 'app'}-tos.md`, out.tos_markdown)}>
              Download ToS (.md)
            </Button>
            <Button onClick={() => download(`${state.appName || 'app'}-tos.html`, out.tos_html, 'text/html;charset=utf-8')}>
              Download ToS (.html)
            </Button>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-3 text-xs text-gray-700">
            <div className="mb-1 font-semibold">Notes</div>
            <pre className="whitespace-pre-wrap">{out.notes}</pre>
          </div>

          <div className="rounded-2xl border border-gray-200">
            <div className="bg-gray-100 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-gray-600">
              Privacy Policy (Markdown)
            </div>
            <div className="max-h-64 overflow-auto p-3 text-sm">
              <pre className="whitespace-pre-wrap">{out.privacy_markdown}</pre>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200">
            <div className="bg-gray-100 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-gray-600">
              Terms of Service (Markdown)
            </div>
            <div className="max-h-64 overflow-auto p-3 text-sm">
              <pre className="whitespace-pre-wrap">{out.tos_markdown}</pre>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
