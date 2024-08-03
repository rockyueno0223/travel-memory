import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase/client';

export async function GET() {
  const { data, error } = await supabase
    .from('memories')
    .select('*');

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
