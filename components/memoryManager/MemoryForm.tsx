'use client';

import React from 'react';
import { supabase } from '@/utils/supabase/client';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from "@/components/layouts/Button";

interface MemoryFormProps {
  unCode: string;
  fetchMemories: () => void;
};

const MemoryForm: React.FC<MemoryFormProps> = ({ unCode, fetchMemories }) => {

  const uploadImgFile = async (image: FormDataEntryValue) => {
    const imgPath = `memory_${Date.now()}`;
    const { data, error } = await supabase
      .storage
      .from('travel-memory')
      .upload(imgPath, image);

    if (error) {
      console.error(`Fail to upload image: ${error}`);
      return null
    }
    return imgPath;
  }

  const createMemory = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const image = formData.get('memory-form-image');
      const comment = formData.get('memory-form-comment');

      if (image) {
        const imgUrl = await uploadImgFile(image);

        if (imgUrl !== null) {
          const { data: { session } } = await supabase.auth.getSession();

          if (!session) return console.error(`Authentication error`);

          const user = session.user;

          const response = await fetch('/api/memories/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id: user.id, country_un_code: unCode, comment, img_url: imgUrl }),
          });
          if (!response.ok) {
            throw new Error('Failed to create memory');
          }
          fetchMemories();
          toast.success('Create memory success!');
        }
      }
    } catch (error) {
      console.error(error);
      toast.error('Fail to create memory');
    }
  };

  return (
    <form onSubmit={createMemory} className='w-full max-w-sm flex-none border p-6'>
      <div className='w-full h-36 flex items-center'>
        <input
          type="file"
          name="memory-form-image"
          id="memory-form-image"
          required
        />
      </div>
      <div className='w-full mt-6 text-xl leading-none'>
        <div className='mt-5'>
          <textarea
            name="memory-form-comment"
            id="memory-form-comment"
            rows={4}
            className='w-full p-2 border rounded'
          />
        </div>
        <div className='w-full flex justify-end mt-2'>
          <Button type="submit">Create</Button>
        </div>
      </div>
    </form>
  );
};

export default MemoryForm;
