'use client';

import React from 'react';
import { supabase } from '@/utils/supabase/client';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface EditMemoryFormProps {
  memory: any;
  fetchMemories: () => void;
};

const EditMemoryForm: React.FC<EditMemoryFormProps> = ({ memory, fetchMemories }) => {

  const deleteImgFile = async () => {
    const filePath = memory.img_url;
    const { data, error } = await supabase
      .storage
      .from('travel-memory')
      .remove([filePath]);
    if (error) {
      console.error(`Fail to delete image: ${error}`);
    } else {
      console.log('Image file deleted successfully');
    }
  }

  const updateMemory = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget.closest('form') as HTMLFormElement);
      const comment = formData.get('edit-memory-form-comment');

      const id = memory.id;

      const response = await fetch('/api/memories/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, comment }),
      });
      if (!response.ok) {
        throw new Error('Failed to update memory');
      }
      fetchMemories();
      toast.success('Update memory success!');
    } catch (error) {
      console.error(error);
      toast.error('Fail to update memory');
    }
  };

  const deleteMemory = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const confirmation = confirm('Are you OK to delete this memory?');
    if (confirmation === true) {
      try {
        const id = memory.id;
        const response = await fetch('/api/memories/delete', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        });
        if (!response.ok) {
          throw new Error('Failed to delete memory');
        }
        await deleteImgFile();
        fetchMemories();
        toast.success('Delete memory success!');
      } catch (error) {
        console.error(error);
        toast.error('Fail to delete memory');
      }
    }
  }

  return (
    <form className='flex-1 w-full flex gap-5 items-center'>
      <div className='w-1/3 h-48'>
        <img
          src={`https://eknieixncpvuirnsuisj.supabase.co/storage/v1/object/public/travel-memory/${memory.img_url}`}
          alt="Memory Photo"
        />
      </div>
      <div className='w-2/3 h-48'>
        <div className='mt-5'>
          <textarea
            name="edit-memory-form-comment"
            id="edit-memory-form-comment"
            rows={4}
            className='w-full p-2'
            defaultValue={memory.comment}
          />
        </div>
        <div className='w-full flex justify-between mt-3'>
          <button
            type="button"
            className="block h-10 w-24 text-lg text-white bg-red-600 rounded"
            onClick={deleteMemory}
          >
            Delete
          </button>
          <button
            type="button"
            className='block h-10 w-24 text-lg text-white bg-[#095A8C] rounded'
            onClick={updateMemory}
          >
            Update
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditMemoryForm;
