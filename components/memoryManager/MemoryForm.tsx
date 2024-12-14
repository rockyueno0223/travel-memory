'use client';

import React, { useState } from 'react';
import { supabase } from '@/utils/supabase/client';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from "@/components/layouts/Button";
import { addMemory } from '@/app/hooks/useMemories';
import { useMemoriesContext } from '@/app/context/MemoriesContext';

interface MemoryFormProps {
  unCode: string;
};

const MemoryForm: React.FC<MemoryFormProps> = ({ unCode }) => {
  const { memories, setMemories } = useMemoriesContext();

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const uploadImgFile = async (image: FormDataEntryValue) => {
    const imgPath = `memory_${Date.now()}`;
    const { data, error } = await supabase
      .storage
      .from('travel-memory')
      .upload(imgPath, image);

    if (error) {
      console.error(`Fail to upload image:`, error);
      return null
    }
    return imgPath;
  }

  const createMemory = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const image = formData.get('memory-form-image');
      const comment = formData.get('memory-form-comment') as string;

      if (image) {
        const imgUrl = await uploadImgFile(image);

        if (imgUrl !== null) {
          const { data: { session } } = await supabase.auth.getSession();

          if (!session) return console.error(`Authentication error`);

          const user = session.user;

          const addedMemory = await addMemory({ user_id: user.id, country_un_code: unCode, comment, img_url: imgUrl });

          if (!addedMemory) {
            throw new Error('Failed to create memory');
          }
          if (memories) setMemories([...memories, addedMemory]);

          // Clear image input value
          const imageInput = document.querySelector<HTMLInputElement>("#memory-form-image");
          if (imageInput) imageInput.value = "";
          // Clear comment textarea value
          const commentInput = document.querySelector<HTMLInputElement>("#memory-form-comment");
          if (commentInput) commentInput.value = "";
          // Clear preview image
          setPreviewImage(null);

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
      <div className='w-full flex flex-col items-center gap-2'>
        <input
          type="file"
          name="memory-form-image"
          id="memory-form-image"
          required
          onChange={handleImageChange}
        />
        {previewImage && (
          <img
            src={previewImage}
            alt="Preview"
            className='w-full h-auto max-h-[576px] mx-auto object-contain'
          />
        )}
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
