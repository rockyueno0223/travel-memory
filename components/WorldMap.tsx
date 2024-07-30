'use client';

import React from 'react';
import { ComposableMap, Geographies, Geography, Sphere, Graticule } from 'react-simple-maps';
import { Tooltip } from "react-tooltip";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Sample data of countries in the "database"
const countriesInDatabase = ['United States', 'Canada', 'Mexico', 'France', 'Germany'];

interface WorldMapProps {
  setTooltipContent: (content: string) => void;
}

const WorldMap: React.FC<WorldMapProps> = ({ setTooltipContent }) => {
  return (
    <ComposableMap projectionConfig={{
      rotate: [-10, 0, 0],
      scale: 147
    }}>
      <Sphere id="rsm-sphere" fill="transparent" stroke="#E4E5E6" strokeWidth={0.5} />
      <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo: any) => {
            const countryName = geo.properties.name;
            const isInDatabase = countriesInDatabase.includes(countryName);

            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onMouseEnter={() => {
                  setTooltipContent(`${geo.properties.name}`);
                }}
                onMouseLeave={() => {
                  setTooltipContent("");
                }}
                //onClick={() => handleCountryClick(geo)}
                style={{
                  default: { fill: isInDatabase ? '#1FA2D5' : '#E5F4F7'},
                  hover: { fill: '#095A8C' },
                  pressed: { fill: '#095A8C' },
                }}
                stroke='#fff'
                strokeWidth={0.5}
                data-tooltip-id="world-map-tooltip"
                data-tooltip-content={geo.properties.name}
              />
            );
          })
        }
      </Geographies>
    </ComposableMap>
  )
}

export default WorldMap;
