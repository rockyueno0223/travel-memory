import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase/client';

export async function DELETE(req: Request) {
  const { id } = await req.json();
  const { data, error } = await supabase
    .from('memories')
    .delete()
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
