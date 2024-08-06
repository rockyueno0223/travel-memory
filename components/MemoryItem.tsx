'use client';

import React from 'react';

interface MemoryItemProps {
  memory: any;
};

const MemoryItem: React.FC<MemoryItemProps> = ({ memory }) => {
  return (
    <div className='flex-1 w-full flex gap-5 items-center'>
      <div className='w-1/3 h-48'>img</div>
      <div className='w-2/3 h-48 flex items-center'>
        {memory.comment}
      </div>
    </div>
  );
};

export default MemoryItem;
