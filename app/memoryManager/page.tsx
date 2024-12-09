import React from "react";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import MemoryManagerClient from "@/components/memoryManager/MemoryManagerClient";
import { CountryData } from "@/types";
import fetchCountryData from "@/app/hooks/useCountryData";

export default async function MemoryManager() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const countryData: CountryData[] = await fetchCountryData() || [];

  return (
    <div className="w-full">
      <MemoryManagerClient countryData={countryData}/>
    </div>
  )
}
