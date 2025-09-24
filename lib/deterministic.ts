import type { FormState } from '../domain/schema';
import type { ClauseFlags } from '../domain/clauses';

export function generateDeterministic(state: FormState, clauses: ClauseFlags) {
  const today = new Date().toISOString().split('T')[0];
  const name = state.appName || 'Your App';
  const co = state.legalEntityName || 'Your Company';
  const email = state.contactEmail || 'contact@example.com';

  const categories = (state.data.categories || '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);
  const gdprOn = clauses.flags.gdpr || clauses.flags.ukGdpr;
  const rights = gdprOn
    ? 'access, rectify, erase, restrict, object, and data portability'
    : 'access and deletion (where applicable)';

  const banner = '**DRAFT FOR REVIEW — NOT LEGAL ADVICE**\n\n';

  const tos = `${banner}# Terms of Service

${name} (the "Service") is provided by ${co}. By using the Service, you agree to these Terms.

## 1. Eligibility
You must be able to form a binding contract to use the Service.

## 2. Your Account
You are responsible for your credentials and all activity under your account.

## 3. Acceptable Use
Do not misuse the Service (illegal activity, infringing content, malware, abusive scraping, or attempts to bypass security).

## 4. License
We grant you a limited, revocable, nonexclusive, nontransferable license to use the Service for its intended purpose.

## 5. User Content
You retain rights to your content. You grant us a license to host and process it to operate and improve the Service.

## 6. Third-Party Services
The Service may integrate third-party SDKs/APIs. We are not responsible for their content or practices.

## 7. Disclaimers
Provided "AS IS" and "AS AVAILABLE" without warranties to the maximum extent permitted by law.

## 8. Limitation of Liability
Our aggregate liability is capped at the greater of (i) fees paid in the 12 months before the event or (ii) $100, to the maximum extent permitted.

## 9. Indemnity
You will indemnify and hold ${co} harmless from claims arising out of your use of the Service or violation of these Terms.

## 10. Termination
We may suspend or terminate your access for breach or to comply with law.

## 11. Changes
We may update these Terms; we will notify you, and continued use means acceptance.

## 12. Governing Law & Dispute Resolution
We will attempt to resolve disputes in good faith. If unresolved, disputes will be handled on an individual basis by binding arbitration where permitted; otherwise, by the competent courts.

## 13. Contact
${co} — ${email}

_Last updated: ${today}_`;

  const pp = `${banner}# Privacy Policy

${co} acts as the controller for personal data processed by ${name}.

## 1. Data We Collect
${state.data.collectsPersonalData
  ? `We may collect: ${categories.join(', ') || 'account and usage information'}.`
  : 'We collect only minimal data necessary to operate the Service.'}
${state.data.analytics ? ' We use analytics to understand product performance.' : ''}
${state.data.ads ? ' We may use advertising SDKs (see Sub-processors).' : ''}
${state.data.location ? ' We may process approximate or precise location if you enable location features.' : ''}
${state.data.crashLogs ? ' We process diagnostics and crash logs to improve stability.' : ''}

## 2. Purposes & Legal Bases
We process data to provide and secure the Service, troubleshoot, communicate with you, and comply with law.
${gdprOn ? ' Where GDPR/UK-GDPR applies, our legal bases may include contract, legitimate interests, consent (for certain features), and legal obligations.' : ''}

## 3. Sharing & Sub-processors
We use vetted vendors for hosting, analytics, payments, and optional SDKs under appropriate data-protection commitments.

## 4. International Transfers
Where data leaves your region, we rely on appropriate safeguards (e.g., SCCs/UK IDTA where applicable).

## 5. Retention
We retain data as necessary for the purposes described, then delete or anonymize.

## 6. Security
We apply administrative, technical, and physical safeguards appropriate to the risk.

## 7. Your Rights
Depending on your location, you may have rights to ${rights}. Contact ${email} to exercise these rights.

## 8. Children
${state.jurisdictions.coppa
  ? 'We comply with COPPA/GDPR-K when applicable, obtaining verifiable parental consent where required.'
  : 'The Service is not directed to children under 13; we do not knowingly collect their data.'}

## 9. Changes
We will post updates and, where appropriate, notify you of material changes.

## 10. Contact
${co} — ${email}

_Last updated: ${today}_`;

  return {
    tos_markdown: tos,
    privacy_markdown: pp,
    notes: 'Deterministic fallback used. Wire an LLM in lib/models.ts to enhance jurisdictional nuance.',
  };
}
