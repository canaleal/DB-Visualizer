export const toUrlSafeB64 = (input: string) =>
  btoa(input).replace(/\//g, "_").replace(/\+/g, "-");
export const fromUrlSafeB64 = (input: string) =>
  atob(input.replace(/_/g, "/").replace(/-/g, "+"));