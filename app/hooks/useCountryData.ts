interface CountryData{
  name: string;
  country_code_alpha2: string;
  un_code: string;
}

interface FetchedCountryData {
  countries: CountryData[];
}

const fetchCountryData = async () => {
    try {
      const response = await fetch("/api/countryData.json");
      const data: FetchedCountryData = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching countryData:", error);
      return null;
    }
};

export default fetchCountryData;
