'use client';

import React, { useState } from 'react';
import OutputPanel from '@/components/output/OutputPanel';

type GeneratePayload = {
  appName: string;
  legalEntityName: string;
  contactEmail: string;
  contactAddress?: string;
  jurisdictions?: string[];
  dataPractices?: string;
};

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Form state (replace with your existing PolicyForm if you have it)
  const [appName, setAppName] = useState('');
  const [legalEntityName, setLegalEntityName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactAddress, setContactAddress] = useState('');
  const [jurisdictions, setJurisdictions] = useState<string[]>([]);
  const [dataPractices, setDataPractices] = useState('');

  // Output
  const [tosMarkdown, setTosMarkdown] = useState<string>('');
  const [privacyMarkdown, setPrivacyMarkdown] = useState<string>('');

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      const payload: GeneratePayload = {
        appName,
        legalEntityName,
        contactEmail,
        contactAddress,
        jurisdictions,
        dataPractices,
      };

      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || `Request failed: ${res.status} ${res.statusText}`);
      }

      // ✅ Ensure we set the exact keys expected by OutputPanel
      setTosMarkdown(String(data.tos_markdown || ''));
      setPrivacyMarkdown(String(data.privacy_markdown || ''));
    } catch (err: any) {
      setErrorMsg(err?.message || 'Generation failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container py-8 space-y-8">
      <section className="rounded-xl border border-border p-6">
        <h1 className="text-2xl font-semibold mb-4">PolicyMint — Generate Legal Policies</h1>
        <form onSubmit={handleGenerate} className="grid gap-4">
          <div className="grid gap-1">
            <label className="text-sm font-medium">App Name</label>
            <input
              className="rounded-md border px-3 py-2 bg-background"
              value={appName}
              onChange={(e) => setAppName(e.target.value)}
              required
              placeholder="My Awesome App"
            />
          </div>
          <div className="grid gap-1">
            <label className="text-sm font-medium">Legal Entity</label>
            <input
              className="rounded-md border px-3 py-2 bg-background"
              value={legalEntityName}
              onChange={(e) => setLegalEntityName(e.target.value)}
              required
              placeholder="MyCo, Inc."
            />
          </div>
          <div className="grid gap-1">
            <label className="text-sm font-medium">Contact Email</label>
            <input
              type="email"
              className="rounded-md border px-3 py-2 bg-background"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              required
              placeholder="legal@myco.com"
            />
          </div>
          <div className="grid gap-1">
            <label className="text-sm font-medium">Contact Address (optional)</label>
            <input
              className="rounded-md border px-3 py-2 bg-background"
              value={contactAddress}
              onChange={(e) => setContactAddress(e.target.value)}
              placeholder="123 Main St, City, Country"
            />
          </div>
          <div className="grid gap-1">
            <label className="text-sm font-medium">Notes / Data Practices (optional)</label>
            <textarea
              className="rounded-md border px-3 py-2 bg-background min-h-[96px]"
              value={dataPractices}
              onChange={(e) => setDataPractices(e.target.value)}
              placeholder="SDKs, analytics, ads, children users, etc."
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className={`inline-flex items-center rounded-md px-4 py-2 text-sm font-medium border transition
                ${loading ? 'bg-muted text-muted-foreground cursor-wait' : 'bg-primary text-primary-foreground hover:opacity-90'}
              `}
            >
              {loading ? 'Generating…' : 'Generate Policies'}
            </button>
            {errorMsg ? <span className="text-sm text-destructive">{errorMsg}</span> : null}
          </div>
        </form>
      </section>

      <OutputPanel
        appName={appName}
        tos_markdown={tosMarkdown}
        privacy_markdown={privacyMarkdown}
      />
    </main>
  );
}
