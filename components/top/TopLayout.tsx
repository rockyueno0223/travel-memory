'use client';

import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { Tooltip } from "react-tooltip";
import 'react-tooltip/dist/react-tooltip.css'

import WorldMap from "@/components/top/WorldMap";
import CountrySelect from "@/components/top/CountrySelect";
import { CountryData, CountryOption, UnCodesInDatabase } from "@/app/hooks/types";

interface TopLayoutProps {
  unCodesInDatabase: UnCodesInDatabase[];
  countryData: CountryData[];
}

const TopLayout: React.FC<TopLayoutProps> = ({ unCodesInDatabase, countryData }) => {
  const router = useRouter();

  const [hoveredCountry, setHoveredCountry] = useState<string>("");
  const [selectedCountryOption, setSelectedCountryOption] = useState<CountryOption | null>(null);

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
      <p className="text-2xl sm:text-3xl mt-12 mb-4 font-bodoni">
        {unCodesInDatabase.length === 1 ? (
          <>
            You've visited  <span className="sm:text-4xl">1</span> country.
          </>
        ) : unCodesInDatabase.length > 1 ? (
          <>
            You've visited <span className="sm:text-4xl">{unCodesInDatabase.length}</span> countries.
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
          <div
            key={index}
            className="w-full max-w-screen-sm mx-auto px-4 sm:px-6 py-3 mb-3 flex justify-between bg-white rounded shadow-md hover:cursor-pointer"
            onClick={() => handleSubmit('list', 'show', unCodeInDatabase.country_un_code)}
          >
            <span className="text-xl text-slate-600">
              {country ? country.name : unCodeInDatabase.country_un_code}
            </span>
            <span className="text-lg text-slate-700">
              {unCodeInDatabase.country_count === 1 ? (
                <>
                  <span className="text-xl">{unCodeInDatabase.country_count}</span> Memory
                </>
              ) : (
                <>
                  <span className="text-xl">{unCodeInDatabase.country_count}</span> Memories
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
