export interface CountryData{
  name: string;
  country_code_alpha2: string;
  un_code: string;
}

export interface FetchedCountryData {
  countries: CountryData[];
}

export interface CountryOption {
  value: string;
  label: string;
}

export interface UnCodesInDatabase{
  country_count: number;
  country_un_code: string;
}

export interface Memory{
  id: number;
  user_id: string;
  country_un_code: string;
  comment: string;
  created_at: string;
  img_url: string;
}
