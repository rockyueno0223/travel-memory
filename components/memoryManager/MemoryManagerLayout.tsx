'use client';

import React from "react";
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from "@/utils/supabase/client";

import CountryItem from "@/components/memoryManager/CountryItem";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import fetchCountryData from "@/app/hooks/useCountryData";
import { CountryData, Memory } from "@/app/hooks/types";
import Button from "@/components/layouts/Button";

interface MemoryManagerLayoutProps {}

const MemoryManagerLayout: React.FC<MemoryManagerLayoutProps> = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [action, setAction] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);

  const [memories, setMemories] = useState<Memory[]>([]);
  const [countriesInDatabase, setCountriesInDatabase] = useState<CountryData[]>([]);

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

    fetchMemories();
  }, [searchParams]);

   useEffect(() => {
    if (memories.length > 0) {
      getCountryData();
    }
  }, [memories]);

  useEffect(() => {
    if (action !== null) {
      router.refresh();
    }
  }, [action, router, selectedCountry]);

  const fetchMemories = async () => {
    try {
      const { data: { session }} = await supabase.auth.getSession();

      if (!session) return console.error(`Authentication error`);

      const user = session.user;

      const response = await fetch(`/api/memories/read?user_id=${user.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setMemories(data);
    } catch (error) {
      console.error(error);
      toast.error('Fail to get memories');
    }
  };

  const getCountryData = async () => {
    const data: CountryData[] | null = await fetchCountryData();
    if (data) {
      const unCodesInDatabase = memories.map(memory => memory.country_un_code);

      let sortedCounties: CountryData[] = Array.from(
        new Set(
          unCodesInDatabase
            .map(unCode => data.find(country => country.un_code === unCode))
            .filter((country): country is CountryData => country !== undefined)
        )
      ).sort((a, b) => parseInt(a.un_code) - parseInt(b.un_code));

      setCountriesInDatabase(sortedCounties);
    }
  }

  const clickTopBtn = (): void => {
    router.push('/top');
  }

  const clickFinishBtn = (): void => {
    setAction('show');
  }

  const clickEditBtn = (): void => {
    setAction('edit');
  }

  return (
    <div className="max-w-screen-xl mx-auto flex-1 w-full flex flex-col gap-6 items-center px-3 sm:px-6 lg:px-8">
      <p className="text-2xl sm:text-4xl font-semibold mt-7 mb-2 sm:mt-9 sm:mb-5 font-bodoni">
        {action === "edit" ? "Update Your Memories" : action === "show" ? "Your Memories" : ""}
      </p>
      <div className='w-full flex justify-between mb-2 sm:mb-5'>
        <Button onClick={clickTopBtn}>Top</Button>
        {action === "edit" && (
          <Button onClick={clickFinishBtn}>Finish</Button>
        )}
        {action === "show" && (
          <Button onClick={clickEditBtn}>Edit</Button>
        )}
      </div>
      <div className="w-full flex flex-col gap-14">
        {selectedCountry ? (
          <CountryItem action={action} country={selectedCountry} memories={memories} fetchMemories={fetchMemories} />
        ) : (
          countriesInDatabase.map((country, index) => (
            <CountryItem key={index} action={action} country={country} memories={memories} fetchMemories={fetchMemories} />
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

export default MemoryManagerLayout;
