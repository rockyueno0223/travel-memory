'use client';

import React from 'react';
import { ComposableMap, Geographies, Geography, Sphere, Graticule } from 'react-simple-maps';
import { UnCodesInDatabase } from '@/app/hooks/types';
import { motion } from "framer-motion"

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface WorldMapProps {
  unCodesInDatabase: UnCodesInDatabase[];
  setTooltipContent: (content: string) => void;
  handleSubmit: (source: string, action: string, unCode?: string) => void;
}

const WorldMap: React.FC<WorldMapProps> = ({ unCodesInDatabase, setTooltipContent, handleSubmit }) => {

  const handleMapClick = (clickedUnCode: string, inDatabase: boolean) => {
    let formAction = "";
    if (inDatabase) {
      formAction = "show";
    } else {
      formAction = "edit";
    }
    handleSubmit("map", formAction, clickedUnCode);
  }

  return (
    <motion.div
      className='w-full'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2.0, delay: 0.5 }}
    >
      <ComposableMap projectionConfig={{
        rotate: [-10, 0, 0],
        scale: 147
      }}>
        <Sphere id="rsm-sphere" fill="transparent" stroke="#E4E5E6" strokeWidth={0.5} />
        <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo: any) => {
              const isInDatabase = unCodesInDatabase.some(unCodeInDatabase => unCodeInDatabase.country_un_code === geo.id);

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
                  onClick={() => handleMapClick(geo.id, isInDatabase)}
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
    </motion.div>
  )
}

export default WorldMap;
