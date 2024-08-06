'use client';

import React from 'react';

interface EditMemoryFormProps {
  memory: any;
  fetchMemories: () => void;
};

const EditMemoryForm: React.FC<EditMemoryFormProps> = ({memory, fetchMemories}) => {
  const updateMemory = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget.closest('form') as HTMLFormElement);
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
      fetchMemories();
      console.log(`Update success!`);
    } catch (error) {
      // setError(error.message);
      console.error(error);
    }
  };

  const deleteMemory = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const id = memory.id;
      const response = await fetch('/hooks/memories/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) {
        throw new Error('Failed to delete memory');
      }
      fetchMemories();
      console.log(`Delete success!`);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form className='flex-1 w-full flex gap-2 items-center h-14'>
      <div className='w-1/3'>
        <input type="file" name="image" id="image" />
      </div>
      <div className='w-2/3'>
        <div>
          <textarea name="comment" id="comment" rows={3} className='w-full'>{memory.comment}</textarea>
        </div>
        <div className='w-full flex justify-between'>
          <button type="button" className="block h-8 w-20 text-sm text-white bg-red-600 rounded" onClick={deleteMemory}>Delete</button>
          <button type="button" className='block h-8 w-20 text-sm text-white bg-[#095A8C] rounded' onClick={updateMemory}>Update</button>
        </div>
      </div>
    </form>
  );
};

export default EditMemoryForm;
