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
  setCountrySource: (content: string) => void;
  selectedCountry: CountryOption | null;
  setSelectedCountry: (content: CountryOption | null) => void;
  handleSubmitFromSelect: (event: React.FormEvent) => void;
};

const CountrySelect: React.FC<CountrySelectProps> = ({setCountrySource, selectedCountry, setSelectedCountry, handleSubmitFromSelect}) => {
  const [countryOptions, setCountryOptions] = useState<CountryOption[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code");
        const data: FetchedData = await response.json();
        setCountryOptions(data.countries);
        setSelectedCountry(data.userSelectValue);

      } catch (error) {
        console.error("Error fetching country options:", error);
      }
    };

    fetchData();
  }, []);

  const handleSelectSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (selectedCountry) {
      // Clear any existing error
      setError(null);
      setCountrySource("select");

      handleSubmitFromSelect(event);
    } else {
      console.error("No country selected");
      setError('Please select a country');
    }
  };

  return (
    <form className='max-w-full flex gap-2 px-0.5' onSubmit={handleSelectSubmit}>
      {error && <p className='text-red-500'>{error}</p>}
      <Select
        options={countryOptions}
        value={selectedCountry}
        onChange={(selectedOption) => setSelectedCountry(selectedOption)}
        className='w-80'
      />
      <button type='submit' className='w-20 text-sm text-white bg-[#095A8C] rounded'>Add</button>
    </form>
  );
};

export default CountrySelect;
