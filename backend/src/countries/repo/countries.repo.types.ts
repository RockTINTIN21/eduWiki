export type CreateCountryRepoInput = {
  name: string;
  countryCode: string;
  ruName: string;
  bgImage: string;
  information?: {
    capital?: string;
    currencyCode?: string;
    languages?: string[];
  };
  requirements?: {
    minimalStudentVisaAge?: number;
    nostrification?: boolean;
    financialGuarantees?: number;
    educationRequirements?: string;
  };
};

export type UpdateCountryRepoInput = Partial<CreateCountryRepoInput>;
