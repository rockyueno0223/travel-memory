import React from "react";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import MemoryManagerClient from "@/components/memoryManager/MemoryManagerClient";
import { CountryData, Memory } from "@/types";
import fetchCountryData from "@/app/hooks/useCountryData";

export default async function MemoryManager() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/memories/read?user_id=${user.id}`, {
    headers: { 'Content-Type': 'application/json' },
  });
  const memories: Memory[] = res.ok ? await res.json() : [];

  const countryData: CountryData[] = await fetchCountryData() || [];

  const unCodesInDatabase = memories.map(memory => memory.country_un_code);
  const countriesInDatabase: CountryData[] = Array.from(
    new Set(
      unCodesInDatabase
        .map(unCode => countryData.find(country => country.un_code === unCode))
        .filter((country): country is CountryData => country !== undefined)
    )
  ).sort((a, b) => parseInt(a.un_code) - parseInt(b.un_code));

  return (
    <div className="w-full">
      <MemoryManagerClient
        memories={memories}
        countriesInDatabase={countriesInDatabase}
      />
    </div>
  )
}
