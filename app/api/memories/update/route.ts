import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase/client';

export async function PUT(req: Request) {
  const { id, comment, img_url } = await req.json();
  const { data, error } = await supabase
    .from('memories')
    .update({ comment, img_url })
    .eq('id', id)
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
