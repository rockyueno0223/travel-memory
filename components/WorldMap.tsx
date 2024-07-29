'use client';

import React from 'react';
import { ComposableMap, Geographies, Geography, GeographyProps, GeographyPaths } from 'react-simple-maps';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Sample data of countries in the "database"
const countriesInDatabase = ['United States', 'Canada', 'Mexico', 'France', 'Germany'];

const WorldMap: React.FC = () => {
  return (
    <ComposableMap>
      <Geographies geography={geoUrl}>
        {({ geographies }: GeographyPaths) =>
          geographies.map((geo: any) => {
            const countryName = geo.properties.NAME;
            const isInDatabase = countriesInDatabase.includes(countryName);

            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                //onClick={() => handleCountryClick(geo)}
                style={{
                  default: { fill: isInDatabase ? '#00F' : '#D6D6DA' }, // Blue for countries in the database, light grey for others
                  hover: { fill: '#F53' },
                  pressed: { fill: '#E42' },
                }}
              />
            );
          })
        }
      </Geographies>
    </ComposableMap>
  )
}

export default WorldMap;
