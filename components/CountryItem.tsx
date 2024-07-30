'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import MemoryItem from "@/components/MemoryItem";

interface Country {
  countryCode: string;
  name: string;
};

interface countryItemProps {
  action: string | null
  country: Country
};

const CountryItem: React.FC<countryItemProps> = ({action, country}) => {
  const router = useRouter();

  return (
    <div>
      <p>{country.name}</p>
      <MemoryItem action={action} country={country} />
    </div>
  );
};

export default CountryItem;
