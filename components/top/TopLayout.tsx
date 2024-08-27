'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { Tooltip } from "react-tooltip";
import 'react-tooltip/dist/react-tooltip.css'

import WorldMap from "@/components/top/WorldMap";
import CountrySelect from "@/components/top/CountrySelect";
import { supabase } from "@/utils/supabase/client";
import fetchCountryData from "@/app/hooks/useCountryData";

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
  const [countryData, setCountryData] = useState<CountryData[]>([]);

  useEffect(() => {
    fetchUnCodes();
    getCountryData();
  }, []);

  const fetchUnCodes = async () => {
    try {
      const { data: { session }} = await supabase.auth.getSession();

      if (!session) return console.error(`Authentication error`);

      const user = session.user;

      const response = await fetch(`/api/unCodes/read?user_id=${user.id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setUnCodesInDatabase(data);
      console.log('Fetch un code success!');
    } catch (error) {
      //setError(error.message);
      console.error("Error fetching unCode:", error);
    }
  };

  const getCountryData = async () => {
    const data: FetchedCountryData | null = await fetchCountryData();
    if (data) {
      setCountryData(data.countries);
    }
  }

  const handleSubmit = async (source: string, action: string, unCode?: string) => {
    if (countryData) {
      // make selected country param
      let selectedCountry = null;
      if (source === "select" && selectedCountryOption) {
        selectedCountry = countryData.find(country => country.country_code_alpha2 === selectedCountryOption.value);
      } else if (source === "map" || source === "list") {
        selectedCountry = countryData.find(country => country.un_code === unCode);
      }
      // selectedCountry = null if source is link

      //make countries in database param
      let countriesInDatabase: CountryData[] = Array.from(
        new Set(
          unCodesInDatabase
            .map(unCodeInDatabase => countryData.find(country => country.un_code === unCodeInDatabase.country_un_code))
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
    <div className="flex-1 w-full flex flex-col items-center pb-10">
      <WorldMap unCodesInDatabase={unCodesInDatabase} setTooltipContent={setHoveredCountry} handleSubmit={handleSubmit} />
      <Tooltip id="world-map-tooltip" content={hoveredCountry} />
      <CountrySelect selectedCountryOption={selectedCountryOption} setSelectedCountryOption={setSelectedCountryOption} handleSubmit={handleSubmit} />
      <p className="text-3xl mt-12 mb-8">
        {unCodesInDatabase.length === 1 ? (
          <>
            You've visited 1 country.
          </>
        ) : unCodesInDatabase.length > 1 ? (
          <>
            You've visited {unCodesInDatabase.length} countries.
          </>
        ) : (
          <>
            Let's add your memories.
          </>
        )}
      </p>
      {unCodesInDatabase.map((unCodeInDatabase, index) => {
        const country = countryData.find(
          (country) => country.un_code === unCodeInDatabase.country_un_code
        );
        return (
          <div key={index} className="w-[480px] border-b border-slate-400 px-6 mb-3 flex justify-between">
            <span className="text-2xl text-slate-600 hover:text-slate-900 hover:cursor-pointer" onClick={() => handleSubmit('list', 'show', unCodeInDatabase.country_un_code)}>
              {country ? country.name : unCodeInDatabase.country_un_code}
            </span>
            <span className="text-lg text-slate-700">
              {unCodeInDatabase.country_count === 1 ? (
                <>
                  {unCodeInDatabase.country_count} memory.
                </>
              ) : (
                <>
                  {unCodeInDatabase.country_count} memories.
                </>
              )}
            </span>
          </div>
        );
      })}
      <p className="mt-8 text-2xl hover:text-slate-500 hover:border-b hover:border-slate-400 hover:cursor-pointer" onClick={() => handleSubmit('link', 'show')}>
        Show all your memories
      </p>
    </div>
  )
}

export default TopLayout;
