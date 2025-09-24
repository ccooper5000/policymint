import { z } from 'zod';
import type { FormState } from './schema';

export const zFormState = z.object({
  appName: z.string().min(1, 'App name is required'),
  description: z.string().min(1, 'Description is required'),
  legalEntityName: z.string().min(1, 'Legal entity name is required'),
  contactEmail: z.string().email('Valid email is required'),
  appType: z.enum(['web', 'mobile', 'desktop', 'api']).optional(),

  jurisdictions: z.object({
    gdpr: z.boolean(),
    ukGdpr: z.boolean(),
    ccpa: z.boolean(),
    pipeda: z.boolean(),
    oaic: z.boolean(),
    lgpd: z.boolean(),
    dpdp: z.boolean(),
    coppa: z.boolean(),
  }),

  data: z.object({
    collectsPersonalData: z.boolean(),
    categories: z.string().optional(), // CSV in this build
    analytics: z.boolean(),
    ads: z.boolean(),
    payments: z.boolean(),
    location: z.boolean(),
    crashLogs: z.boolean(),
    ugc: z.boolean(),
  }),
}) satisfies z.ZodType<FormState>;

export function validateState(s: unknown) {
  const r = zFormState.safeParse(s);
  return r.success ? { ok: true as const } : { ok: false as const, error: r.error.issues.map(i => i.message).join('; ') };
}
