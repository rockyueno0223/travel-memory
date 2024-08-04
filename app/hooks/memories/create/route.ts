// app/api/memories/create/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase/client';

export async function POST(req: Request) {
  const { comment, user_id } = await req.json();
  const { data, error } = await supabase
    .from('memories')
    .insert([{ comment, user_id }]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
