'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import MemoryItem from "@/components/MemoryItem";
import MemoryForm from '@/components/MemoryForm';

interface Country {
  name: string;
  country_code_alpha2: string;
  un_code: string;
};

interface countryItemProps {
  action: string | null
  country: Country
};

const CountryItem: React.FC<countryItemProps> = ({action, country}) => {
  const router = useRouter();

  return (
    <div className='flex-1 w-full flex flex-col gap-2 items-center'>
      <p className='text-2xl ms-0'>{country.name}</p>
      <p>{country.country_code_alpha2}</p>
      <p>{country.un_code}</p>
      <MemoryItem action={action} country={country} />
      {action === "add" && (
        <MemoryForm />
      )}
    </div>
  );
};

export default CountryItem;
