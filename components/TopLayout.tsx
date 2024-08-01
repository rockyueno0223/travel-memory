'use client';

import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { Tooltip } from "react-tooltip";
import 'react-tooltip/dist/react-tooltip.css'

import WorldMap from "@/components/WorldMap";
import CountrySelect from "@/components/CountrySelect";

interface CountryData{
  name: string;
  country_code_alpha2: string;
  un_code: number;
}

interface FetchedData {
  countries: CountryData[];
}

interface CountryOption {
  value: string;
  label: string;
}

interface TopLayoutProps {}

const TopLayout: React.FC<TopLayoutProps> = () => {
  const router = useRouter();

  const [hoveredCountry, setHoveredCountry] = useState<string>("");

  const [countrySource, setCountrySource] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<CountryOption | null>(null);

  const fetchData = async (): Promise<CountryData[] | undefined> => {
    try {
      const response = await fetch("/api/countryData.json");
      const data: FetchedData = await response.json();
      return data.countries;

    } catch (error) {
      console.error("Error fetching countryData:", error);
    }
  };

  const formatCountryDataFromSelect = async (countryOption: CountryOption) => {
    const fetchedData = await fetchData();

    if (fetchedData) {
      return fetchedData.find(country => country.country_code_alpha2 === countryOption.value);
    }
  }


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // const countrySourceValue = countrySource;
    // const selectedCountryValue = selectedCountry;

    console.log('log1');

    // countrySource:
    console.log(`countrySource: ${countrySource}`);

    // selectedCountry: [object Object]
    console.log(`selectedCountry: ${selectedCountry}`);


    if (selectedCountry) {
      console.log('log2');

      // Format country object
      const formattedCountry = await formatCountryDataFromSelect(selectedCountry);
      // Replace selected country with array
      const formattedCountries = [formattedCountry];
      // Encode the array to pass as param
      const queryParams = encodeURIComponent(JSON.stringify(formattedCountries));
      router.push(`/memoryManager?action=add&countries=${queryParams}`);
    } else {
      console.error("I can't send form data");
    }
  };

  return (
    <div className="flex-1 w-full flex flex-col gap-6 items-center">
      <WorldMap setTooltipContent={setHoveredCountry} />
      <Tooltip id="world-map-tooltip" content={hoveredCountry} />
      <CountrySelect setCountrySource={setCountrySource} selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} handleSubmit={handleSubmit} />
      <p>selectedCountry: {selectedCountry?.label}</p>
      <p>countrySource: {countrySource}</p>
    </div>
  )
}

export default TopLayout;
