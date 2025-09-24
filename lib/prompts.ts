import type { FormState } from '../domain/schema';
import type { ClauseFlags } from '../domain/clauses';

export function buildPromptPack(state: FormState, clauses: ClauseFlags): string {
  const active = Object.entries(clauses.flags)
    .filter(([, on]) => on)
    .map(([k]) => k)
    .join(', ');

  const features: string[] = [];
  if (state.data.analytics) features.push('analytics');
  if (state.data.ads) features.push('advertising');
  if (state.data.payments) features.push('payments');
  if (state.data.location) features.push('location');
  if (state.data.crashLogs) features.push('crash logs');
  if (state.data.ugc) features.push('UGC');

  const today = new Date().toISOString().split('T')[0];

  return `
You are senior tech/privacy counsel. Draft plain-language, enforceable **Terms of Service** and **Privacy Policy** in **Markdown** and return JSON.

Product facts:
- App Name: ${state.appName}
- Description: ${state.description}
- Company: ${state.legalEntityName}
- Contact Email: ${state.contactEmail}
- Jurisdictions active: ${active || 'none'}
- Collects Personal Data: ${state.data.collectsPersonalData ? 'yes' : 'no'}
- Data Categories: ${state.data.categories || 'unspecified'}
- Features: ${features.join(', ') || 'none'}

Requirements:
1) Start both docs with **DRAFT FOR REVIEW — NOT LEGAL ADVICE**
2) Include a change log line with date ${today}
3) Use contact ${state.contactEmail} where relevant
4) Apply rights based on active jurisdictions (GDPR/UK-GDPR, CCPA/CPRA, etc.)
5) Keep language concise for non-lawyers; short paragraphs; numbered headings
6) Include limitation of liability cap (greater of 12-month fees or $100)

Return **JSON**:
{
  "tos_markdown": string,
  "privacy_markdown": string,
  "notes": string
}
`.trim();
}
