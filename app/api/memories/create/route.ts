// app/api/memories/create/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase/client';

export async function POST(req: Request) {
  const { user_id, country_un_code, comment, img_url } = await req.json();
  const { data, error } = await supabase
    .from('memories')
    .insert([{ user_id, country_un_code, comment, img_url }]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
