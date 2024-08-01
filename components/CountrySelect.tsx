'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
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

const CountrySelect: React.FC<CountrySelectProps> = () => {
  const router = useRouter();
  const [countryOptions, setCountryOptions] = useState<CountryOption[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<CountryOption | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code");
        const data: FetchedData = await response.json();
        setCountryOptions(data.countries);
        setSelectedCountry(data.userSelectValue);

      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchData();
  }, []);

  const getCountryName = (label: string): string => {
    return label.split(' ').slice(1).join(' ');
  };

  const formatCountryObj = (countryOption: CountryOption) => {
    return {
      countryCode: countryOption.value,
      name: getCountryName(countryOption.label)
    };
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (selectedCountry) {
      // Clear any existing error
      setError(null);

      // Format country object
      const formattedCountry = formatCountryObj(selectedCountry);
      // Replace selected country with array
      const formattedCountries = [formattedCountry];
      // Encode the array to pass as param
      const queryParams = encodeURIComponent(JSON.stringify(formattedCountries));
      router.push(`/memoryManager?action=add&countries=${queryParams}`);
    } else {
      console.error("No country selected");
      setError('Please select country');
    }
  };

  return (
    <form className='max-w-full flex gap-2 px-0.5' onSubmit={handleSubmit}>
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
