'use client';

import React from 'react'
import { CountryData, UnCodesInDatabase } from '@/app/hooks/types';
import CountrySummaryItem from '@/components/top/CountrySummaryItem';

interface CountrySummaryProps {
  unCodesInDatabase: UnCodesInDatabase[];
  countryData: CountryData[];
  handleSubmit: (source: string, action: string, unCode?: string) => void;
}

const CountrySummary: React.FC<CountrySummaryProps> = ({ unCodesInDatabase, countryData, handleSubmit }) => {
  return (
    <div className='w-full flex flex-col gap-5'>
      <div className="flex flex-col items-center gap-2">
        <p className="text-2xl sm:text-3xl font-bodoni">
          {unCodesInDatabase.length === 1 ? (
            <>You've visited  <span className="sm:text-4xl">1</span> country.</>
          ) : unCodesInDatabase.length > 1 ? (
            <>
              You've visited <span className="sm:text-4xl">{unCodesInDatabase.length}</span> countries.
            </>
          ) : (
            <>Let's add your memories.</>
          )}
        </p>
        {unCodesInDatabase.length >= 1 && (
          <p onClick={() => handleSubmit('link', 'show')} className="text-xl text-[#0000ED] border-b border-[#0000ED] hover:border-transparent cursor-pointer">
            Show all your memories
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3">
        {unCodesInDatabase.map((unCodeInDatabase, index) => {
          const country = countryData.find(
            (country) => country.un_code === unCodeInDatabase.country_un_code
          );
          return (
            <CountrySummaryItem
              key={index}
              countryName={country ? country.name : unCodeInDatabase.country_un_code}
              memoryCount={unCodeInDatabase.country_count}
              onClick={() => handleSubmit("list", "show", unCodeInDatabase.country_un_code)}
            />
          );
        })}
      </div>
    </div>
  )
}

export default CountrySummary
