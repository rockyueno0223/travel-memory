import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase/client';

export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const memory_id = url.searchParams.get('memory_id');

  const { data, error } = await supabase
    .from('memories')
    .delete()
    .eq('id', memory_id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
