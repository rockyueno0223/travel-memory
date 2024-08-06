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

interface CountryOption {
  value: string;
  label: string;
}

interface CountrySelectProps {
  selectedCountryOption: CountryOption | null;
  setSelectedCountryOption: (content: CountryOption | null) => void;
  handleSubmit: (source: string, action: string, unCode?: string) => void;
};

const CountrySelect: React.FC<CountrySelectProps> = ({ selectedCountryOption, setSelectedCountryOption, handleSubmit}) => {
  const [countryOptions, setCountryOptions] = useState<CountryOption[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code");
        const data: FetchedData = await response.json();
        setCountryOptions(data.countries);
        setSelectedCountryOption(data.userSelectValue);

      } catch (error) {
        console.error("Error fetching country options:", error);
      }
    };

    fetchData();
  }, []);

  const handleClickAddBtn = () => {

    if (selectedCountryOption) {
      // Clear any existing error
      setError(null);
      handleSubmit("select", "edit");
    } else {
      console.error("No country selected");
      setError('Please select a country');
    }
  };

  return (
    <div className='max-w-full flex gap-2 px-0.5'>
      {error && <p className='text-red-500'>{error}</p>}
      <Select
        options={countryOptions}
        value={selectedCountryOption}
        onChange={(selectedOption) => setSelectedCountryOption(selectedOption)}
        className='w-80'
      />
      <button type='button' className='w-20 text-sm text-white bg-[#095A8C] rounded' onClick={handleClickAddBtn}>Add</button>
    </div>
  );
};

export default CountrySelect;
