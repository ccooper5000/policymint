export type ClauseFlags = {
  flags: {
    gdpr: boolean;
    ukGdpr: boolean;
    ccpa: boolean;
    pipeda: boolean;
    oaic: boolean;
    lgpd: boolean;
    dpdp: boolean;
    coppa: boolean;
  };
};

export function pickClauses(state: any): ClauseFlags {
  const j = state.jurisdictions || {};
  return {
    flags: {
      gdpr: !!j.gdpr,
      ukGdpr: !!j.ukGdpr,
      ccpa: !!j.ccpa,
      pipeda: !!j.pipeda,
      oaic: !!j.oaic,
      lgpd: !!j.lgpd,
      dpdp: !!j.dpdp,
      coppa: !!j.coppa,
    },
  };
}
