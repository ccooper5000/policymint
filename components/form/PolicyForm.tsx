'use client';

import React from 'react';
import Card from '../ui/card';
import Input from '../ui/input';
import TextArea from '../ui/textarea';
import Toggle from '../ui/toggle';
import Button from '../ui/button';
import type { FormState } from '../../domain/schema';

type Props = {
  state: FormState;
  onChange: (next: FormState) => void;
  onGenerate: () => void;
  busy: boolean;
};

export default function PolicyForm({ state, onChange, onGenerate, busy }: Props) {
  // flat field update
  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    onChange({ ...state, [key]: value });
  };

  // nested path update (e.g., "jurisdictions.gdpr" or "data.analytics")
  const updateNested = (path: string, value: any) => {
    const next: any = structuredClone(state);
    const parts = path.split('.');
    let obj = next;
    for (let i = 0; i < parts.length - 1; i++) obj = obj[parts[i]];
    obj[parts[parts.length - 1]] = value;
    onChange(next);
  };

  return (
    <Card>
      <h2 className="mb-4 text-lg font-semibold">App &amp; Company</h2>
      <div className="grid gap-4">
        <Input
          label="App Name *"
          value={state.appName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => update('appName', e.target.value)}
          placeholder="My Awesome App"
          required
        />
        <TextArea
          label="Short Description *"
          value={state.description}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => update('description', e.target.value)}
          placeholder="One sentence about what your app does"
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input
            label="Legal Entity Name *"
            value={state.legalEntityName}
            onChange={(e) => update('legalEntityName', (e.target as HTMLInputElement).value)}
            placeholder="PeppyDrop LLC"
            required
          />
          <Input
            label="Contact Email *"
            type="email"
            value={state.contactEmail}
            onChange={(e) => update('contactEmail', (e.target as HTMLInputElement).value)}
            placeholder="legal@yourco.com"
            required
          />
        </div>
        <Input
          label="Contact Address"
          value={state.contactAddress || ''}
          onChange={(e) => update('contactAddress', (e.target as HTMLInputElement).value)}
          placeholder="Street, City, Region, Country"
        />
      </div>

      <h3 className="mt-6 text-base font-semibold">Jurisdictions</h3>
      <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Toggle label="GDPR (EU)" checked={state.jurisdictions.gdpr} onChange={(v) => updateNested('jurisdictions.gdpr', v)} />
        <Toggle label="UK GDPR" checked={state.jurisdictions.ukGdpr} onChange={(v) => updateNested('jurisdictions.ukGdpr', v)} />
        <Toggle label="CCPA/CPRA (California)" checked={state.jurisdictions.ccpa} onChange={(v) => updateNested('jurisdictions.ccpa', v)} />
        <Toggle label="PIPEDA (Canada)" checked={state.jurisdictions.pipeda} onChange={(v) => updateNested('jurisdictions.pipeda', v)} />
        <Toggle label="OAIC (Australia)" checked={state.jurisdictions.oaic} onChange={(v) => updateNested('jurisdictions.oaic', v)} />
        <Toggle label="LGPD (Brazil)" checked={state.jurisdictions.lgpd} onChange={(v) => updateNested('jurisdictions.lgpd', v)} />
        <Toggle label="DPDP (India)" checked={state.jurisdictions.dpdp} onChange={(v) => updateNested('jurisdictions.dpdp', v)} />
        <Toggle label="COPPA (US under-13)" checked={state.jurisdictions.coppa} onChange={(v) => updateNested('jurisdictions.coppa', v)} />
      </div>

      <h3 className="mt-6 text-base font-semibold">Data &amp; Legal</h3>
      <div className="mt-2 grid gap-4">
        <Toggle
          label="Collects personal data"
          checked={state.data.collectsPersonalData}
          onChange={(v) => updateNested('data.collectsPersonalData', v)}
        />
        <TextArea
          label="Data Categories (CSV)"
          value={state.data.categories || ''}
          onChange={(e) => updateNested('data.categories', (e.target as HTMLTextAreaElement).value)}
          placeholder="Account identifiers, Contact info, Usage data, Device IDs, Diagnostics, Payment tokens, Location"
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Toggle label="Analytics SDKs" checked={state.data.analytics} onChange={(v) => updateNested('data.analytics', v)} />
          <Toggle label="Advertising SDKs" checked={state.data.ads} onChange={(v) => updateNested('data.ads', v)} />
          <Toggle label="Payments" checked={state.data.payments} onChange={(v) => updateNested('data.payments', v)} />
          <Toggle label="Location" checked={state.data.location} onChange={(v) => updateNested('data.location', v)} />
          <Toggle label="Crash logs" checked={state.data.crashLogs} onChange={(v) => updateNested('data.crashLogs', v)} />
          <Toggle label="User-generated content (UGC)" checked={state.data.ugc} onChange={(v) => updateNested('data.ugc', v)} />
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <Button onClick={onGenerate} disabled={busy} className={busy ? 'opacity-60' : ''}>
          {busy ? 'Generating…' : 'Generate Drafts'}
        </Button>
      </div>
    </Card>
  );
}
