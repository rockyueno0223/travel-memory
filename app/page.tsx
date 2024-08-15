import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import Header from "@/components/Header";

export default async function Index() {
  return (
    <div className="flex-1 w-full flex flex-col items-center">
      <div className="w-full relative">
        <picture>
          <source
            srcSet="/images/desktop/main-visual1-pc.jpg"
            media="(min-width: 1024px)"
          />
          <source
            srcSet="/images/mobile/main-visual1-sp.jpg"
            media="(max-width: 1023px)"
          />
          <img
            src="/images/mobile/main-visual1-sp.jpg"
            alt="Temples"
            className="w-full h-auto"
          />
        </picture>
        <div className="absolute top-[36%] w-full flex justify-center">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-center">
            Travel Memory
          </h1>
        </div>
        <div className="absolute top-[50%] w-full flex justify-center">
          <Link
            href="/login"
            className="py-1 md:py-2 px-4 sm:px-5 md:px-6 text-base sm:text-lg md:text-xl border border-black rounded bg-transparent"
          >
            Start Now
          </Link>
        </div>
      </div>
    </div>
  );
}
