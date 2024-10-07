'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { Tooltip } from "react-tooltip";
import 'react-tooltip/dist/react-tooltip.css'

import WorldMap from "@/components/top/WorldMap";
import CountrySelect from "@/components/top/CountrySelect";
import { supabase } from "@/utils/supabase/client";
import fetchCountryData from "@/app/hooks/useCountryData";
import { CountryData, CountryOption, UnCodesInDatabase } from "@/app/hooks/types";

interface TopLayoutProps {}

const TopLayout: React.FC<TopLayoutProps> = () => {
  const router = useRouter();

  const [hoveredCountry, setHoveredCountry] = useState<string>("");
  const [selectedCountryOption, setSelectedCountryOption] = useState<CountryOption | null>(null);
  const [unCodesInDatabase, setUnCodesInDatabase] = useState<UnCodesInDatabase[]>([]);
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
    const data: CountryData[] | null = await fetchCountryData();
    if (data) {
      setCountryData(data);
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
      // selectedCountry is null if source is link

      // pass params
      const selectedCountryParam = encodeURIComponent(JSON.stringify(selectedCountry));
      router.push(`/memoryManager?action=${action}&selectedCountry=${selectedCountryParam}`);
    } else {
      console.error("We failed to fetch country data");
    }
  }

  return (
    <div className="flex-1 w-full flex flex-col items-center pb-10 px-3 sm:px-6 lg:px-8">
      <WorldMap unCodesInDatabase={unCodesInDatabase} setTooltipContent={setHoveredCountry} handleSubmit={handleSubmit} />
      <Tooltip id="world-map-tooltip" content={hoveredCountry} />
      <CountrySelect selectedCountryOption={selectedCountryOption} setSelectedCountryOption={setSelectedCountryOption} handleSubmit={handleSubmit} />
      <p className="text-3xl mt-12 mb-4 font-bodoni">
        {unCodesInDatabase.length === 1 ? (
          <>
            You've visited  <span className="text-4xl">1</span> country.
          </>
        ) : unCodesInDatabase.length > 1 ? (
          <>
            You've visited <span className="text-4xl">{unCodesInDatabase.length}</span> countries.
          </>
        ) : (
          <>
            Let's add your memories.
          </>
        )}
      </p>
      <p
        className="mb-8 text-xl text-[#0000ED] border-b border-[#0000ED] hover:border-transparent hover:cursor-pointer"
        onClick={() => handleSubmit('link', 'show')}
      >
        Show all your memories
      </p>
      {unCodesInDatabase.map((unCodeInDatabase, index) => {
        const country = countryData.find(
          (country) => country.un_code === unCodeInDatabase.country_un_code
        );
        return (
          <div key={index} className="w-[480px] border-b border-slate-400 px-6 pb-1 mb-3 flex justify-between">
            <span className="text-xl text-slate-600 hover:text-slate-900 hover:cursor-pointer" onClick={() => handleSubmit('list', 'show', unCodeInDatabase.country_un_code)}>
              {country ? country.name : unCodeInDatabase.country_un_code}
            </span>
            <span className="text-lg text-slate-700">
              {unCodeInDatabase.country_count === 1 ? (
                <>
                  <span className="text-xl">{unCodeInDatabase.country_count}</span> memory.
                </>
              ) : (
                <>
                  <span className="text-xl">{unCodeInDatabase.country_count}</span> memories.
                </>
              )}
            </span>
          </div>
        );
      })}
    </div>
  )
}

export default TopLayout;
