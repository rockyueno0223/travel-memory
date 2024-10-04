'use client';

import React from 'react';

interface MemoryItemProps {
  memory: any;
};

const MemoryItem: React.FC<MemoryItemProps> = ({ memory }) => {
  return (
    <div className='w-full max-w-sm flex-none border p-6'>
      <div className='w-full'>
        <img
          src={`https://eknieixncpvuirnsuisj.supabase.co/storage/v1/object/public/travel-memory/${memory.img_url}`}
          alt="Memory Photo"
          className='w-full h-auto max-h-[576px] mx-auto object-contain'
        />
      </div>
      <div className='w-full min-h-16 mt-6 text-xl leading-none font-handlee'>
        {memory.comment}
      </div>
    </div>
  );
};

export default MemoryItem;
