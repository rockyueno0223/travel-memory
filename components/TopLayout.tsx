'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { Tooltip } from "react-tooltip";
import 'react-tooltip/dist/react-tooltip.css'

import WorldMap from "@/components/WorldMap";
import CountrySelect from "@/components/CountrySelect";
import { supabase } from "@/utils/supabase/client";

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
  const [selectedCountryOption, setSelectedCountryOption] = useState<CountryOption | null>(null);
  const [unCodesInDatabase, setUnCodesInDatabase] = useState<any[]>([]);

  useEffect(() => {
    fetchUnCodes();
  }, []);

  const fetchUnCodes = async () => {
    try {
      const { data: { session }} = await supabase.auth.getSession();

      if (!session) return console.error(`Authentication error`);

      const user = session.user;

      const response = await fetch(`/hooks/unCodes/read?user_id=${user.id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setUnCodesInDatabase(data);
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

  const handleSubmit = async (source: string, action: string, unCode?: string) => {
    // fetch country data
    const fetchedCountryData = await fetchCountryData();
    if (fetchedCountryData) {
      // make selected country param
      let selectedCountry = null;
      if (source === "select" && selectedCountryOption) {
        selectedCountry = fetchedCountryData.find(country => country.country_code_alpha2 === selectedCountryOption.value);
      } else if (source === "map") {
        selectedCountry = fetchedCountryData.find(country => country.un_code === unCode);
      }
      //make countries in database param
      let countriesInDatabase: CountryData[] = Array.from(
        new Set(
          unCodesInDatabase
            .map(unCodeInDatabase => fetchedCountryData.find(country => country.un_code === unCodeInDatabase.country_un_code))
            .filter((country): country is CountryData => country !== undefined)
        )
      ).sort((a, b) => parseInt(a.un_code) - parseInt(b.un_code));

      // pass params
      const selectedCountryParam = encodeURIComponent(JSON.stringify(selectedCountry));
      const countriesInDatabaseParam = encodeURIComponent(JSON.stringify(countriesInDatabase));
      router.push(`/memoryManager?action=${action}&selectedCountry=${selectedCountryParam}&countriesInDatabase=${countriesInDatabaseParam}`);
    } else {
      console.error("We failed to fetch country data");
    }
  }

  return (
    <div className="flex-1 w-full flex flex-col items-center pb-8">
      <WorldMap unCodesInDatabase={unCodesInDatabase} setTooltipContent={setHoveredCountry} handleSubmit={handleSubmit} />
      <Tooltip id="world-map-tooltip" content={hoveredCountry} />
      <CountrySelect selectedCountryOption={selectedCountryOption} setSelectedCountryOption={setSelectedCountryOption} handleSubmit={handleSubmit} />
      <p className="text-3xl mt-12 mb-8">You've visited 2 countries.</p>
      {unCodesInDatabase.map((unCodeInDatabase, index) => (
        <div key={index} className="w-[480px] text-2xl border-b border-slate-400 ps-6 mb-3">
          {unCodeInDatabase.country_un_code}
        </div>
      ))}
    </div>
  )
}

export default TopLayout;
