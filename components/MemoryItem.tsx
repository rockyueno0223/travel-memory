'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface MemoryItemProps {
  memory: any;
};

const MemoryItem: React.FC<MemoryItemProps> = ({ memory }) => {
  const router = useRouter();

  return (
    <div className='flex-1 w-full flex gap-2 items-center h-14'>
      <div className='w-1/3'>img</div>
      <div className='w-2/3'>
        {memory.comment}
      </div>
    </div>
  );
};

export default MemoryItem;
