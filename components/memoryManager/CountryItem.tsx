'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import MemoryItem from "@/components/memoryManager/MemoryItem";
import MemoryForm from '@/components/memoryManager/MemoryForm';
import EditMemoryForm from '@/components/memoryManager/EditMemoryForm';
import { CountryData, Memory } from '@/app/hooks/types';

interface CountryItemProps {
  action: string;
  country: CountryData;
  memories: Memory[];
  fetchMemories: () => void;
};

const CountryItem: React.FC<CountryItemProps> = ({action, country, memories, fetchMemories}) => {
  const router = useRouter();

  const sortedMemories = memories.filter(memory => {
    return memory.country_un_code === country.un_code
  });

  return (
    <div className='flex-1 w-full flex flex-col gap-6 items-center'>
      <p className='text-4xl w-full text-left'>
        {country.name}
      </p>
      <div className='w-full flex flex-col md:flex-row items-center md:items-start md:flex-wrap gap-8'>
        {action === "edit" && (
          <>
            {sortedMemories.map(memory => (
              <EditMemoryForm key={memory.id} memory={memory} fetchMemories={fetchMemories} />
            ))}
            <MemoryForm unCode={country.un_code} fetchMemories={fetchMemories} />
          </>
        )}
        {action === "show" && (
          sortedMemories.map(memory => (
            <MemoryItem key={memory.id} memory={memory} />
          ))
        )}
      </div>
    </div>
  );
};

export default CountryItem;
