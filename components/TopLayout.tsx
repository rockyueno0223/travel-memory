'use client';

import React, { useState, useEffect } from "react";
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

interface FetchedCountryData {
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
  const [memories, setMemories] = useState<any[]>([]);

  useEffect(() => {
    fetchMemories();
  }, []);

  const fetchMemories = async () => {
    try {
      const response = await fetch('/hooks/memories/read');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);

      setMemories(data);
      console.log('Fetch success!');

    } catch (error) {
      //setError(error.message);
      console.error(error);
    }
  };

  const fetchCountryData = async (): Promise<CountryData[] | undefined> => {
    try {
      const response = await fetch("/api/countryData.json");
      const data: FetchedCountryData = await response.json();
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
      const fetchedCountryData = await fetchCountryData();

      let formattedCountry;
      if (fetchedCountryData) {
        formattedCountry = fetchedCountryData.find(country => country.country_code_alpha2 === selectedCountry.value);
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
    const fetchedCountryData = await fetchCountryData();

    let formattedCountry;
    if (fetchedCountryData) {
      formattedCountry = fetchedCountryData.find(country => country.un_code === unCode);
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
      <p>Memories:</p>
      {memories.map((memory, index) => (
        <p key={index}>{memory.comment}</p>
      ))}
    </div>
  )
}

export default TopLayout;
