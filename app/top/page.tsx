import React from "react";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import TopLayout from "@/components/TopLayout";

export default async function Top() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="w-full">
      <TopLayout />
    </div>
  )
}
