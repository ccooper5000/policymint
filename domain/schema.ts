export type FormState = {
  // App & org
  appName: string;
  description: string;
  appType?: 'web' | 'mobile' | 'desktop' | 'api';
  legalEntityName: string;
  contactEmail: string;
  contactAddress?: string;

  // Jurisdictions
  jurisdictions: {
    gdpr: boolean;
    ukGdpr: boolean;
    ccpa: boolean;
    pipeda: boolean;
    oaic: boolean;
    lgpd: boolean;
    dpdp: boolean;
    coppa: boolean;
  };

  // Data flags
  data: {
    collectsPersonalData: boolean;
    categories?: string; // CSV string in MVP
    analytics: boolean;
    ads: boolean;
    payments: boolean;
    location: boolean;
    crashLogs: boolean;
    ugc: boolean;
  };
};

export const defaultState: FormState = {
  appName: '',
  description: '',
  appType: 'web',
  legalEntityName: '',
  contactEmail: '',
  contactAddress: '',

  jurisdictions: {
    gdpr: true,
    ukGdpr: true,
    ccpa: true,
    pipeda: false,
    oaic: false,
    lgpd: false,
    dpdp: false,
    coppa: false,
  },

  data: {
    collectsPersonalData: true,
    categories: 'Account identifiers, Contact info, Usage data',
    analytics: true,
    ads: false,
    payments: false,
    location: false,
    crashLogs: true,
    ugc: true,
  },
};
