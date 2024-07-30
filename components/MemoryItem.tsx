'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Country {
  countryCode: string;
  name: string;
};

interface countryItemProps {
  action: string | null
  country: Country
};

const MemoryItem: React.FC<countryItemProps> = ({action, country}) => {
  const router = useRouter();

  return (
    <div>
      <p>{country.name}</p>
      <div className='flex'>
        <div>img</div>
        <div>
          <div>This is comment.</div>
          <button type="submit">Click</button>
        </div>
      </div>
    </div>
  );
};

export default MemoryItem;
