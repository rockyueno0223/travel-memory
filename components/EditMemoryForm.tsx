'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase/client';

interface Country {
  name: string;
  country_code_alpha2: string;
  un_code: string;
};

interface EditMemoryFormProps {
  memory: any;
};

const EditMemoryForm: React.FC<EditMemoryFormProps> = ({memory}) => {
  const router = useRouter();

  const updateMemory = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const comment = formData.get('comment');

      const id = memory.id;

      const response = await fetch('/hooks/memories/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, comment }),
      });
      if (!response.ok) {
        throw new Error('Failed to update memory');
      }
      //fetchMemories();
      console.log(`Update success!`);
    } catch (error) {
      // setError(error.message);
      console.error(error);
    }
  };

  return (
    <form onSubmit={updateMemory} className='flex-1 w-full flex gap-2 items-center h-14'>
      <div className='w-1/3'>
        <input type="file" name="image" id="image" />
      </div>
      <div className='w-2/3'>
        <div>
          <textarea name="comment" id="comment" rows={3} className='w-full'>{memory.comment}</textarea>
        </div>
        <button type="submit" className='block h-8 w-20 text-sm text-white bg-[#095A8C] rounded'>Update</button>
      </div>
    </form>
  );
};

export default EditMemoryForm;
