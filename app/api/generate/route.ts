// app/api/generate/route.ts
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';        // ✅ ensure standard Node runtime on Netlify
export const dynamic = 'force-dynamic'; // avoid caching of env-dependent responses

export async function GET() {
  const hasOpenAI = Boolean(process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.length > 3);
  return NextResponse.json({
    ok: true,
    hasOpenAIKey: hasOpenAI,
    // never leak the key; expose minimal diagnostics only
    model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
    runtime: 'nodejs',
  });
}

type GeneratePayload = {
  appName: string;
  legalEntityName: string;
  contactEmail: string;
  contactAddress?: string;
  jurisdictions?: string[]; // e.g., ["US-CA", "EU", "UK"]
  dataPractices?: string;   // freeform notes about data collection/SDKs/etc.
};

function ensureEnv(key: string): string {
  const v = process.env[key];
  if (!v) throw new Error(`Missing required environment variable: ${key}`);
  return v;
}

function tosPrompt(input: GeneratePayload) {
  const juris = input.jurisdictions?.length ? input.jurisdictions.join(', ') : 'global';
  return `
You are a technology lawyer generating a crystal-clear, developer-friendly Terms of Service for a consumer app.

App name: ${input.appName}
Legal entity: ${input.legalEntityName}
Contact email: ${input.contactEmail}
Contact address: ${input.contactAddress ?? 'N/A'}
Primary jurisdictions to consider: ${juris}
Declared data practices / notes: ${input.dataPractices ?? 'N/A'}

Write a Markdown Terms of Service with:
- Clear, readable sections and consistent headings
- Service eligibility, account requirements, acceptable use
- IP ownership & licenses, UGC terms, DMCA
- Payments/subscriptions (if not applicable, include a short "No payments" statement)
- Disclaimers, limitation of liability, indemnity
- Governing law & venue aligned to the jurisdiction(s)
- Changes to terms; contact details
Use simple language, but keep it enforceable. Output only Markdown.
  `.trim();
}

function privacyPrompt(input: GeneratePayload) {
  const juris = input.jurisdictions?.length ? input.jurisdictions.join(', ') : 'global';
  return `
You are a privacy counsel generating a compliant, human-readable Privacy Policy for a consumer app.

App name: ${input.appName}
Legal entity: ${input.legalEntityName}
Contact email: ${input.contactEmail}
Contact address: ${input.contactAddress ?? 'N/A'}
Primary jurisdictions to consider: ${juris}
Declared data practices / notes: ${input.dataPractices ?? 'N/A'}

Write a Markdown Privacy Policy that includes:
- What data we collect (by category), sources, and purposes
- Legal bases (for GDPR if EU in scope)
- Sharing/disclosure categories, processors, sub-processors
- Retention, security, international transfers
- User rights (GDPR/UK DPA/CCPA/CPRA as applicable); how to exercise
- Children's data (COPPA check if <13)
- Changes to policy; contact details
Be explicit where jurisdictional sections differ (e.g., EU/UK/California). Output only Markdown.
  `.trim();
}

async function callOpenAI(content: string) {
  const apiKey = ensureEnv('OPENAI_API_KEY'); // ✅ read at request time
  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';

  // Use fetch to avoid SDK/runtime bundling issues
  const resp = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: 'You are a senior technology attorney who writes concise, enforceable policies.' },
        { role: 'user', content },
      ],
      temperature: 0.2,
    }),
  });

  if (!resp.ok) {
    const text = await resp.text().catch(() => '');
    throw new Error(`OpenAI error: ${resp.status} ${resp.statusText} ${text}`);
  }

  const data = (await resp.json()) as {
    choices: { message: { content: string } }[];
  };
  return data.choices?.[0]?.message?.content?.trim() || '';
}

export async function POST(req: Request) {
  try {
    const payload = (await req.json()) as GeneratePayload;

    // Basic validation
    if (!payload?.appName || !payload?.legalEntityName || !payload?.contactEmail) {
      return NextResponse.json(
        { error: 'Missing required fields: appName, legalEntityName, contactEmail' },
        { status: 400 }
      );
    }

    // Generate ToS & Privacy sequentially (simple + predictable). For perf, you can Promise.all.
    const [tosMarkdown, privacyMarkdown] = await Promise.all([
      callOpenAI(tosPrompt(payload)),
      callOpenAI(privacyPrompt(payload)),
    ]);

    return NextResponse.json({
      ok: true,
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      tos_markdown: tosMarkdown,
      privacy_markdown: privacyMarkdown,
    });
  } catch (err: any) {
    const message = err?.message || 'Server error';
    const missingKey = /Missing required environment variable: OPENAI_API_KEY/.test(message);
    return NextResponse.json(
      {
        ok: false,
        error: missingKey
          ? 'OPENAI_API_KEY is missing at runtime. Set it in Netlify → Site settings → Environment, then redeploy.'
          : message,
      },
      { status: missingKey ? 500 : 500 }
    );
  }
}
