'use client';

import React, { useEffect, useState } from 'react';
import Select from "react-select";

interface CountryOption {
  value: string;
  label: string;
}

interface FetchedData {
  countries: CountryOption[];
  userSelectValue: CountryOption | null;
}

interface CountrySelectProps {};

const CountrySelect: React.FC<CountrySelectProps>  = () => {
  const [countries, setCountries] = useState<CountryOption[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<CountryOption | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code");
        const data: FetchedData = await response.json();
        setCountries(data.countries);
        setSelectedCountry(data.userSelectValue);

      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <form className='max-w-full flex gap-2 px-0.5'>
      <Select
        options={countries}
        value={selectedCountry}
        onChange={(selectedOption) => setSelectedCountry(selectedOption)}
        className='w-80'
      />
      <button type='submit' className='w-20 text-sm text-white bg-[#095A8C] rounded'>Add</button>
    </form>
  );
};

export default CountrySelect;
