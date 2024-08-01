'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Country {
  name: string;
  country_code_alpha2: string;
  un_code: string;
};

interface MemoryFormProps {};

const MemoryForm: React.FC<MemoryFormProps> = () => {
  const router = useRouter();

  return (
    <div className='flex-1 w-full flex gap-2 items-center h-14'>
      <div className='w-1/3'>
        <input type="file" name="image" id="image" />
      </div>
      <div className='w-2/3'>
        <div>
          <textarea name="comment" id="comment" rows={3} className='w-full'></textarea>
        </div>
        <button type="submit" className='block h-8 w-20 text-sm text-white bg-[#095A8C] rounded'>Click</button>
      </div>
    </div>
  );
};

export default MemoryForm;
