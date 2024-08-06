'use client';

import React from 'react';

interface MemoryItemProps {
  memory: any;
};

const MemoryItem: React.FC<MemoryItemProps> = ({ memory }) => {
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
