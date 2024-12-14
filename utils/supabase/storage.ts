import { supabase } from '@/utils/supabase/client';

export const uploadImgFile = async (image: File): Promise<string | null> => {
    const imgPath = `memory_${Date.now()}`;
    const { data, error } = await supabase
      .storage
      .from('travel-memory')
      .upload(imgPath, image);

    if (error) {
      console.error(`Fail to upload image:`, error);
      return null;
    }
    return imgPath;
  }

export const deleteImgFile = async (imgPath: string): Promise<boolean> => {
  const { data, error } = await supabase
    .storage
    .from('travel-memory')
    .remove([imgPath]);

  if (error) {
    console.error(`Fail to delete image:`, error);
    return false;
  }
  return true;
}
