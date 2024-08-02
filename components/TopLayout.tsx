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
  un_code: string;
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

  const handleSubmitFromSelect = async (event: React.FormEvent) => {
    event.preventDefault();

    console.log('log1');

    if (selectedCountry) {
      console.log('log2');

      // Format country object
      const fetchedData = await fetchData();

      let formattedCountry;
      if (fetchedData) {
        formattedCountry = fetchedData.find(country => country.country_code_alpha2 === selectedCountry.value);
      }

      // Replace selected country with array
      const formattedCountries = [formattedCountry];
      // Encode the array to pass as param
      const queryParams = encodeURIComponent(JSON.stringify(formattedCountries));
      router.push(`/memoryManager?action=add&countries=${queryParams}`);
    } else {
      console.error("I can't send form data");
    }
  };

  const handleSubmitFromMap = async (unCode: string, action: string) => {
    const fetchedData = await fetchData();

    let formattedCountry;
    if (fetchedData) {
      formattedCountry = fetchedData.find(country => country.un_code === unCode);
    }

    // Replace selected country with array
    const formattedCountries = [formattedCountry];
    // Encode the array to pass as param
    const queryParams = encodeURIComponent(JSON.stringify(formattedCountries));
    console.log(queryParams);

    router.push(`/memoryManager?action=${action}&countries=${queryParams}`);
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-6 items-center">
      <WorldMap setTooltipContent={setHoveredCountry} handleSubmitFromMap={handleSubmitFromMap} />
      <Tooltip id="world-map-tooltip" content={hoveredCountry} />
      <CountrySelect selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} handleSubmitFromSelect={handleSubmitFromSelect} />
      <p>selectedCountry: {selectedCountry?.label}</p>
    </div>
  )
}

export default TopLayout;
