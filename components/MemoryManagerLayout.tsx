'use client';

import React from "react";
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import CountryItem from "@/components/CountryItem";

interface MemoryManagerLayoutProps {}

interface Country {
  countryCode: string;
  name: string;
}

const TopLayout: React.FC<MemoryManagerLayoutProps> = () => {
  const searchParams = useSearchParams();
  const [action, setAction] = useState<string | null>(null);
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    // Get action param
    const actionParam = searchParams.get('action');
    setAction(actionParam);
    // Get countries param
    const countriesParam = searchParams.get('countries');
    if (countriesParam) {
      const parsedCountries: Country[] = JSON.parse(decodeURIComponent(countriesParam));
      setCountries(parsedCountries);
    }
  }, [searchParams]);

  return (
    <div className="flex-1 w-full flex flex-col gap-6 items-center">
      <h1>Memories Page</h1>
      <p>{action}</p>
      {countries.map((country, index) => (
        <CountryItem key={index} action={action} country={country} />
      ))}
    </div>
  )
}

export default TopLayout;
