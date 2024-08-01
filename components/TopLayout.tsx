'use client';

import React, { useState, useEffect } from "react";
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

interface TopLayoutProps {}

const TopLayout: React.FC<TopLayoutProps> = () => {

  const [hoveredCountry, setHoveredCountry] = useState<string>("");
  const [countryData, setCountryData] = useState<CountryData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/countryData.json");
        const data: FetchedData = await response.json();
        setCountryData(data.countries);

      } catch (error) {
        console.error("Error fetching countryData:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex-1 w-full flex flex-col gap-6 items-center">
      <WorldMap setTooltipContent={setHoveredCountry} />
      <Tooltip id="world-map-tooltip" content={hoveredCountry} />
      <CountrySelect />
    </div>
  )
}

export default TopLayout;
