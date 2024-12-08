'use client';

import React, { useState } from "react";
import { useRouter } from 'next/navigation';

import WorldMap from "@/components/top/WorldMap";
import CountrySelect from "@/components/top/CountrySelect";
import CountrySummary from "@/components/top/CountrySummary";
import { CountryData, CountryOption, UnCodesInDatabase } from "@/types";

interface TopClientProps {
  unCodesInDatabase: UnCodesInDatabase[];
  countryData: CountryData[];
}

const TopClient: React.FC<TopClientProps> = ({ unCodesInDatabase, countryData }) => {
  const router = useRouter();

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
    <div className="flex-1 w-full flex flex-col items-center p-3">
      <WorldMap unCodesInDatabase={unCodesInDatabase} handleSubmit={handleSubmit} />
      <div className="w-full max-w-screen-sm mx-auto flex flex-col gap-8">
        <CountrySelect
          selectedCountryOption={selectedCountryOption}
          setSelectedCountryOption={setSelectedCountryOption}
          handleSubmit={handleSubmit}
        />
        <CountrySummary
          unCodesInDatabase={unCodesInDatabase}
          countryData={countryData}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  )
}

export default TopClient;
