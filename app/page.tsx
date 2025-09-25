'use client';

import { useState } from 'react';
import Header from '../components/chrome/Header';
import PolicyForm from '../components/form/PolicyForm';
import OutputPanel from '../components/output/OutputPanel';
import { FormState, defaultState } from '../domain/schema';

export default function Page() {
  const [state, setState] = useState<FormState>(defaultState);
  const [busy, setBusy] = useState(false);
  const [out, setOut] = useState<any>(null);

  async function onGenerate() {
    setBusy(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(state),
      });
      if (!res.ok) throw new Error(await res.text());
      setOut(await res.json());
    } catch (e: any) {
      console.error('Generation failed:', e);
      alert(e?.message || 'Generation failed');
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="mx-auto max-w-6xl p-6 space-y-6">
      <Header />
      <div className="grid gap-6 md:grid-cols-2">
        <PolicyForm state={state} onChange={setState} onGenerate={onGenerate} busy={busy} />
        <OutputPanel state={state} out={out} />
      </div>
      <footer className="text-xs text-gray-500">
        Drafting aid only — not legal advice. Please consult a lawyer before use.
      </footer>
    </main>
  );
}
