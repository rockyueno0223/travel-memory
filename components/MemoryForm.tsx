'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase/client';

interface Country {
  name: string;
  country_code_alpha2: string;
  un_code: string;
};

interface MemoryFormProps {};

const MemoryForm: React.FC<MemoryFormProps> = () => {
  const router = useRouter();

  const createMemory = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const comment = formData.get('comment');

      const { data: { session }} = await supabase.auth.getSession();

      if (!session) return console.error(`Authentication error`);

      const user = session.user;

      const response = await fetch('/hooks/memories/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comment, user_id: user.id }),
      });
      if (!response.ok) {
        throw new Error('Failed to create memory');
      }
      //fetchMemories();
      console.log(`Create success!`);
    } catch (error) {
      // setError(error.message);
      console.error(error);
    }
  };

  return (
    <form onSubmit={createMemory} className='flex-1 w-full flex gap-2 items-center h-14'>
      <div className='w-1/3'>
        <input type="file" name="image" id="image" />
      </div>
      <div className='w-2/3'>
        <div>
          <textarea name="comment" id="comment" rows={3} className='w-full'></textarea>
        </div>
        <button type="submit" className='block h-8 w-20 text-sm text-white bg-[#095A8C] rounded'>Create</button>
      </div>
    </form>
  );
};

export default MemoryForm;
