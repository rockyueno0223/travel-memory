'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import MemoryItem from "@/components/MemoryItem";
import MemoryForm from '@/components/MemoryForm';
import EditMemoryForm from '@/components/EditMemoryForm';

interface Country {
  name: string;
  country_code_alpha2: string;
  un_code: string;
};

interface CountryItemProps {
  action: string;
  country: Country;
  memories: any[];
  fetchMemories: () => void;
};

const CountryItem: React.FC<CountryItemProps> = ({action, country, memories, fetchMemories}) => {
  const router = useRouter();

  const sortedMemories = memories.filter(memory => {
    return memory.country_un_code === country.un_code
  });

  return (
    <div className='flex-1 w-full flex flex-col gap-2 items-center'>
      <p className='text-2xl ms-0'>{country.name}</p>
      {action === "edit" && (
        <>
          {sortedMemories.map(memory => (
            <EditMemoryForm key={memory.id} memory={memory} fetchMemories={fetchMemories} />
          ))}
          <MemoryForm fetchMemories={fetchMemories} />
        </>
      )}
      {action === "show" && (
        sortedMemories.map(memory => (
          <MemoryItem key={memory.id} memory={memory} />
        ))
      )}
    </div>
  );
};

export default CountryItem;
