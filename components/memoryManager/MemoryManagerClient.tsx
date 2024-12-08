'use client';

import React from "react";
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import CountryItem from "@/components/memoryManager/CountryItem";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { CountryData, Memory } from "@/types";
import Button from "@/components/layouts/Button";

interface MemoryManagerClientProps {
  memories: Memory[];
  countriesInDatabase: CountryData[];
}

const MemoryManagerClient: React.FC<MemoryManagerClientProps> = ({ memories, countriesInDatabase }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [action, setAction] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);

  useEffect(() => {
    // Get action param
    const actionParam = searchParams.get('action');
    if (actionParam) setAction(actionParam);
    // Get selected country param
    const selectedCountryParam = searchParams.get('selectedCountry');
    if (selectedCountryParam) {
      const parsedSelectedCountry: CountryData = JSON.parse(decodeURIComponent(selectedCountryParam));
      setSelectedCountry(parsedSelectedCountry);
    }
  }, [searchParams]);

  const handleActionChange = (newAction: string) => {
    setAction(newAction);
    router.refresh();
  };

  const clickTopBtn = (): void => {
    router.push('/top');
  }

  return (
    <div className="max-w-screen-xl mx-auto flex-1 w-full flex flex-col gap-6 items-center px-3 sm:px-6 lg:px-8">
      <p className="text-2xl sm:text-4xl font-semibold mt-7 mb-2 sm:mt-9 sm:mb-5 font-bodoni">
        {action === "edit" ? "Update Your Memories" : action === "show" ? "Your Memories" : ""}
      </p>
      <div className='w-full flex justify-between mb-2 sm:mb-5'>
        <Button onClick={clickTopBtn}>Top</Button>
        {action === "edit" && (
          <Button onClick={() => handleActionChange("show")}>Finish</Button>
        )}
        {action === "show" && (
          <Button onClick={() => handleActionChange("edit")}>Edit</Button>
        )}
      </div>
      <div className="w-full flex flex-col gap-14">
        {selectedCountry ? (
          <CountryItem
            action={action}
            country={selectedCountry}
            memories={memories}
            fetchMemories={fetchMemories}
          />
        ) : (
          countriesInDatabase.map((country, index) => (
            <CountryItem
              key={index}
              action={action}
              country={country}
              memories={memories}
              fetchMemories={fetchMemories}
            />
          ))
        )}
      </div>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  )
}

export default MemoryManagerClient;
