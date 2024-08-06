'use client';

import React from 'react';
import { supabase } from '@/utils/supabase/client';

interface MemoryFormProps {
  unCode: string;
  fetchMemories: () => void;
};

const MemoryForm: React.FC<MemoryFormProps> = ({ unCode, fetchMemories }) => {
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
        body: JSON.stringify({ user_id: user.id, country_un_code: unCode, comment }),
      });
      if (!response.ok) {
        throw new Error('Failed to create memory');
      }
      fetchMemories();
      console.log(`Create success!`);
    } catch (error) {
      // setError(error.message);
      console.error(error);
    }
  };

  return (
    <form onSubmit={createMemory} className='flex-1 w-full flex gap-5 items-center'>
      <div className='w-1/3 h-48'>
        <input type="file" name="image" id="image" />
      </div>
      <div className='w-2/3 h-48'>
        <div className='mt-5'>
          <textarea name="comment" id="comment" rows={3} className='w-full p-2'></textarea>
        </div>
        <div className='w-full flex justify-end mt-3'>
          <button type="submit" className='block h-10 w-24 text-lg text-white bg-[#095A8C] rounded'>Create</button>
        </div>
      </div>
    </form>
  );
};

export default MemoryForm;
