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

  useEffect(() => {
    if (action !== null) {
      router.refresh();
    }
  }, [action, router]);

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
      <p>{action}</p>
      {countries.map((country, index) => (
        <CountryItem key={index} action={action} country={country} />
      ))}
    </div>
  )
}

export default MemoryManagerLayout;
