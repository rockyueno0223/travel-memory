import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import WorldMap from "@/components/WorldMap"

export default async function Top() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <WorldMap />
    </div>
  )
}
