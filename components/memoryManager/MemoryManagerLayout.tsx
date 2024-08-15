'use client';

import React from "react";
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from "@/utils/supabase/client";

import CountryItem from "@/components/memoryManager/CountryItem";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface MemoryManagerLayoutProps {}

interface Country {
  name: string;
  country_code_alpha2: string;
  un_code: string;
}

const MemoryManagerLayout: React.FC<MemoryManagerLayoutProps> = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [action, setAction] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [countriesInDatabase, setCountriesInDatabase] = useState<Country[]>([]);
  const [memories, setMemories] = useState<any[]>([]);

  useEffect(() => {
    // Get action param
    const actionParam = searchParams.get('action');
    if (actionParam) setAction(actionParam);
    // Get selected country param
    const selectedCountryParam = searchParams.get('selectedCountry');
    if (selectedCountryParam) {
      const parsedSelectedCountry: Country = JSON.parse(decodeURIComponent(selectedCountryParam));
      setSelectedCountry(parsedSelectedCountry);
    }
    // Get countries in database param
    const countriesInDatabaseParam = searchParams.get('countriesInDatabase');
    if (countriesInDatabaseParam) {
      const parsedCountriesInDatabase: Country[] = JSON.parse(decodeURIComponent(countriesInDatabaseParam));
      setCountriesInDatabase(parsedCountriesInDatabase);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchMemories();
  }, []);

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

      const response = await fetch(`/hooks/memories/read?user_id=${user.id}`, {
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
    <div className="flex-1 w-full flex flex-col gap-6 items-center px-2">
      <p className="text-4xl font-bold mt-10 mb-8">
        {action === "edit" ? "Update Your Memories" : action === "show" ? "Your Memories" : ""}
      </p>
      <div className='w-full flex justify-between mb-6'>
        <button onClick={clickTopBtn} className="block h-10 w-24 text-lg bg-neutral-400 border rounded">Top</button>
        {action === "edit" && (
          <button onClick={clickFinishBtn} className="block h-10 w-24 text-lg bg-neutral-400 border rounded">Finish</button>
        )}
        {action === "show" && (
          <button onClick={clickEditBtn} className="block h-10 w-24 text-lg bg-neutral-400 border rounded">Edit</button>
        )}
      </div>
      {selectedCountry ? (
        <CountryItem action={action} country={selectedCountry} memories={memories} fetchMemories={fetchMemories} />
      ) : (
        countriesInDatabase.map((country, index) => (
          <CountryItem key={index} action={action} country={country} memories={memories} fetchMemories={fetchMemories} />
        ))
      )}
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
