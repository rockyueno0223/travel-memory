'use client';

import React, { useState } from "react";
import { Tooltip } from "react-tooltip";
import 'react-tooltip/dist/react-tooltip.css'

import WorldMap from "@/components/WorldMap";
import CountrySelect from "@/components/CountrySelect";

interface TopLayoutProps {}

const TopLayout: React.FC<TopLayoutProps> = () => {

  const [hoveredCountry, setHoveredCountry] = useState<string>("");

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <WorldMap setTooltipContent={setHoveredCountry} />
      <Tooltip id="world-map-tooltip" content={hoveredCountry} />
      <CountrySelect />
    </div>
  )
}

export default TopLayout;
