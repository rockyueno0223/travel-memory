import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase/client';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const user_id = url.searchParams.get('user_id');

  if (!user_id) {
    return NextResponse.json({ error: 'User ID not provided' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('memories')
    .select('*')
    .eq('user_id', user_id)
    .order('country_un_code', { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
