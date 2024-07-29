'use client';

import React from 'react';
import { ComposableMap, Geographies, Geography, GeographyProps, GeographyPaths, Sphere, Graticule } from 'react-simple-maps';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Sample data of countries in the "database"
const countriesInDatabase = ['United States', 'Canada', 'Mexico', 'France', 'Germany'];

const WorldMap: React.FC = () => {
  return (
    <ComposableMap projectionConfig={{
      rotate: [-10, 0, 0],
      scale: 147
    }}>
      <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
      <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
      <Geographies geography={geoUrl}>
        {({ geographies }: GeographyPaths) =>
          geographies.map((geo: any) => {
            const countryName = geo.properties.name;
            const isInDatabase = countriesInDatabase.includes(countryName);

            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                //onClick={() => handleCountryClick(geo)}
                style={{
                  default: { fill: isInDatabase ? '#1FA2D5' : '#E5F4F7'}, // Blue for countries in the database, light grey for others
                  hover: { fill: '#095A8C' },
                  pressed: { fill: '#095A8C' },
                }}
                stroke='#fff'
                strokeWidth={0.5}
              />
            );
          })
        }
      </Geographies>
    </ComposableMap>
  )
}

export default WorldMap;
