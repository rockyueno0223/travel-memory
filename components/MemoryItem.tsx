'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Country {
  name: string;
  country_code_alpha2: string;
  un_code: string;
};

interface countryItemProps {
  action: string | null
  country: Country
};

const MemoryItem: React.FC<countryItemProps> = ({action, country}) => {
  const router = useRouter();

  return (
    <div className='flex-1 w-full flex gap-2 items-center h-14'>
      <div className='w-1/3'>img</div>
      <div className='w-2/3'>
        <div>This is comment.</div>
        <button type="submit" className='block h-8 w-20 text-sm text-white bg-[#095A8C] rounded'>Click</button>
      </div>
    </div>
  );
};

export default MemoryItem;
