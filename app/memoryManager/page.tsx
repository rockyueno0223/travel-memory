import React from "react";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import MemoryManagerLayout from "@/components/MemoryManagerLayout";

export default async function MemoryManager({ searchParams, }: {
  searchParams: {
    action: string,
    countryCode: string
  };
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="w-full">
      <MemoryManagerLayout formData={searchParams} />
    </div>
  )
}
