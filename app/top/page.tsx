import React from "react";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import TopLayout from "@/components/top/TopLayout";
import { CountryData, UnCodesInDatabase } from "../hooks/types";
import fetchCountryData from "../hooks/useCountryData";

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
      <TopLayout unCodesInDatabase={unCodesInDatabase} countryData={countryData} />
    </div>
  )
}
