export type AssertCreateArgs = {
  name: string;
  countryCode: string;
  currencyCode?: string;
};

export type AssertUpdateArgs = {
  id: string;
  name?: string;
  countryCode?: string;
  currencyCode?: string;
};

export type AssertDeleteArgs = {
  id: string;
};
