'use client';

import React from 'react'

interface CountrySummaryItemProps {
  countryName: string;
  memoryCount: number;
  onClick: () => void;
}

const CountrySummaryItem: React.FC<CountrySummaryItemProps> = ({ countryName, memoryCount, onClick }) => {
  return (
    <div onClick={onClick} className="w-full px-4 sm:px-6 py-3 flex justify-between bg-white rounded shadow-md cursor-pointer">
      <span className="text-xl text-slate-600">
        {countryName}
      </span>
      <span className="text-lg text-slate-700">
        {memoryCount === 1 ? (
          <><span className="text-xl">{memoryCount}</span> Memory</>
        ) : (
          <><span className="text-xl">{memoryCount}</span> Memories</>
        )}
      </span>
    </div>
  )
}

export default CountrySummaryItem
