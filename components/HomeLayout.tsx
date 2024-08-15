"use client";

import React from 'react'
import { supabase } from "@/utils/supabase/client";
import { useRouter } from 'next/navigation';

const HomeLayout = () => {
  const router = useRouter();

  const handleStartBtnClick = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      router.push('/top');
    } else {
      router.push('/login');
    }
  }

  return (
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
        <button
          type="button"
          onClick={handleStartBtnClick}
          className="py-1 md:py-2 px-4 sm:px-5 md:px-6 text-base sm:text-lg md:text-xl border border-black rounded bg-transparent"
        >
          Start Now
        </button>
      </div>
    </div>
  )
}

export default HomeLayout
