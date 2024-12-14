'use client';

import React from 'react';
import { supabase } from '@/utils/supabase/client';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Memory } from '@/types';
import Button from "@/components/layouts/Button";
import { deleteMemory, updateMemory } from '@/app/hooks/useMemories';
import { useMemoriesContext } from '@/app/context/MemoriesContext';
import { deleteImgFile } from '@/utils/supabase/storage';

interface EditMemoryFormProps {
  memory: Memory;
};

const EditMemoryForm: React.FC<EditMemoryFormProps> = ({ memory }) => {
  const { memories, setMemories } = useMemoriesContext();

  const handleUpdateMemory = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget.closest('form') as HTMLFormElement);
      const comment = formData.get('edit-memory-form-comment') as string || null;
      if (!comment) return;

      const id = memory.id;

      const updatedMemory = await updateMemory({ id, comment });
      if (!updatedMemory) {
        throw new Error('Failed to update memory');
      }

      if (memories) {
        setMemories(
          memories.map(memory => memory.id === id ? updatedMemory : memory)
        );
      }
      toast.success('Update memory success!');
    } catch (error) {
      console.error(error);
      toast.error('Fail to update memory');
    }
  };

  const handleDeleteMemory = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const confirmation = confirm('Are you OK to delete this memory?');
    if (confirmation === true) {
      try {
        const id = memory.id;
        const isDeleted = await deleteMemory(id);
        if (!isDeleted) {
          throw new Error('Failed to delete memory');
        }

        try {
          await deleteImgFile(memory.img_url);
        } catch (imageDeleteError) {
          console.error('Image deletion failed, but proceed delete action', imageDeleteError);
        }
        // Proceed with memory deletion even if image deletion fails

        if (memories) {
          setMemories(
            memories.filter(memory => memory.id !== id)
          );
        }
        toast.success('Delete memory success!');
      } catch (error) {
        console.error(error);
        toast.error('Fail to delete memory');
      }
    }
  }

  return (
    <form className='w-full max-w-sm flex-none border p-6'>
      <div className='w-full'>
        <img
          src={`https://eknieixncpvuirnsuisj.supabase.co/storage/v1/object/public/travel-memory/${memory.img_url}`}
          alt="Memory Photo"
          className='w-full h-auto max-h-[576px] mx-auto object-contain'
        />
      </div>
      <div className='w-full mt-6 text-xl leading-none'>
        <div>
          <textarea
            name="edit-memory-form-comment"
            id="edit-memory-form-comment"
            rows={4}
            className='w-full p-2 border rounded'
            defaultValue={memory.comment}
          />
        </div>
        <div className='w-full flex justify-between mt-2'>
          <Button onClick={handleDeleteMemory} style="delete">
            Delete
          </Button>
          <Button onClick={handleUpdateMemory}>
            Update
          </Button>
        </div>
      </div>
    </form>
  );
};

export default EditMemoryForm;
