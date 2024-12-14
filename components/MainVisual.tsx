"use client";

import React, { useEffect, useState } from 'react'
import { supabase } from "@/utils/supabase/client";
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion"

interface MainVisualProps {
  desktopImages: string[];
}

const MainVisual: React.FC<MainVisualProps> = ({ desktopImages }) => {
  const router = useRouter();

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Loop through images
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % desktopImages.length);
    }, 5000);

    // Clear interval on unmount
    return () => clearInterval(interval);
  }, []);

  const currentImage = `/images/desktop/${desktopImages[currentIndex]}`;

  const handleStartBtnClick = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      router.push('/top');
    } else {
      router.push('/login');
    }
  }

  return (
    <>
      <picture className="w-full h-auto">
        <motion.img
          key={currentImage}
          src={currentImage}
          alt="Travel Memory Visual"
          loading="lazy"
          className="w-full h-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
        />
      </picture>

      <div className="absolute top-[36%] w-full flex justify-center">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-center font-bodoni text-white">
          Travel Memory
        </h1>
      </div>
      <div className="absolute top-[50%] w-full flex justify-center">
        <button
          type="button"
          onClick={handleStartBtnClick}
          className="py-1 md:py-2 px-4 sm:px-5 md:px-6 text-base sm:text-lg md:text-xl border border-white rounded bg-transparent font-handlee text-white"
        >
          Start Now
        </button>
      </div>
    </>
  )
}

export default MainVisual
