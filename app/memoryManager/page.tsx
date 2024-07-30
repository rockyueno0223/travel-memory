import React from "react";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import MemoryManagerLayout from "@/components/MemoryManagerLayout";

export default async function MemoryManager() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="w-full">
      <MemoryManagerLayout />
    </div>
  )
}
