import React from "react";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { CountryData, UnCodesInDatabase } from "@/types";
import fetchCountryData from "@/app/hooks/useCountryData";
import TopClient from "@/components/top/TopClient";

export default async function Top() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/unCodes/read?user_id=${user.id}`);
  const unCodesInDatabase: UnCodesInDatabase[] = res.ok ? await res.json() : [];

  const countryData: CountryData[] = await fetchCountryData() || [];

  return (
    <div className="w-full">
      <TopClient unCodesInDatabase={unCodesInDatabase} countryData={countryData} />
    </div>
  )
}
