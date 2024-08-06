'use client';

import React from "react";
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import CountryItem from "@/components/CountryItem";

interface MemoryManagerLayoutProps {}

interface Country {
  name: string;
  country_code_alpha2: string;
  un_code: string;
}

const MemoryManagerLayout: React.FC<MemoryManagerLayoutProps> = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [action, setAction] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [countriesInDatabase, setCountriesInDatabase] = useState<Country[]>([]);

  useEffect(() => {
    // Get action param
    const actionParam = searchParams.get('action');
    if (actionParam) setAction(actionParam);
    // Get selected country param
    const selectedCountryParam = searchParams.get('selectedCountry');
    if (selectedCountryParam) {
      const parsedSelectedCountry: Country = JSON.parse(decodeURIComponent(selectedCountryParam));
      setSelectedCountry(parsedSelectedCountry);
    }
    // Get countries in database param
    const countriesInDatabaseParam = searchParams.get('countriesInDatabase');
    if (countriesInDatabaseParam) {
      const parsedCountriesInDatabase: Country[] = JSON.parse(decodeURIComponent(countriesInDatabaseParam));
      setCountriesInDatabase(parsedCountriesInDatabase);
    }
  }, [searchParams]);

  useEffect(() => {
    if (action !== null) {
      router.refresh();
    }
  }, [action, router, selectedCountry]);

  const clickTopBtn = (): void => {
    router.push('/top');
  }

  const clickFinishBtn = (): void => {
    setAction('show');
  }

  const clickEditBtn = (): void => {
    setAction('edit');
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-6 items-center">
      <p className="text-2xl font-bold">
        {action === "edit" ? "Update Your Memories" : action === "show" ? "Your Memories" : ""}
      </p>
      <div className='w-full flex justify-between'>
        <button onClick={clickTopBtn} className="block">Top</button>
        {action === "edit" && (
          <button onClick={clickFinishBtn} className="block">Finish</button>
        )}
        {action === "show" && (
          <button onClick={clickEditBtn} className="block">Edit</button>
        )}
      </div>
      <h1>Memories Page</h1>
      <p>Action: {action}</p>
      <p>Selected country name: {selectedCountry?.name}</p>
      {countriesInDatabase.map((country, index) => (
        <CountryItem key={index} action={action} country={country} />
      ))}
    </div>
  )
}

export default MemoryManagerLayout;
