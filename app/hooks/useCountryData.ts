import { FetchedCountryData } from "@/types";

const fetchCountryData = async () => {
    try {
      const response = await fetch(`/data/countryData.json`);
      const data: FetchedCountryData = await response.json();
      return data.countries;
    } catch (error) {
      console.error("Error fetching countryData:", error);
      return null;
    }
};

export default fetchCountryData;
