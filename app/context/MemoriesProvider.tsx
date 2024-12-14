"use client";

import { useEffect, useState } from "react";
import { supabase } from '@/utils/supabase/client';
import { MemoriesContext } from "@/app/context/MemoriesContext";
import { Memory } from "@/types";
import { fetchMemories } from "@/app/hooks/useMemories";
import { toast } from "react-toastify";

export const MemoriesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [memories, setMemories] = useState<Memory[] | null>(null);

  const getMemories = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();

      // Remove memories from localStorage when not authenticated
      if (!session) {
        setMemories(null);
        localStorage.removeItem("memories");
        return;
      }

      const userId = session.user.id;

      // Fetch memories from localStorage or database
      const savedMemories = localStorage.getItem("memories");
      if (savedMemories) {
        setMemories(JSON.parse(savedMemories));
      } else {
        const fetchedMemories = await fetchMemories(userId);
        setMemories(fetchedMemories);
        localStorage.setItem("memories", JSON.stringify(fetchedMemories));
      }
    } catch (error) {
      console.error("Error getting memories:", error);
      toast.error("Failed to fetch memories. Please try again.");
    }
  }

  useEffect(() => {
    getMemories();

    // Listen to auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setTimeout(async () => {
        console.log('event called', event);

        await getMemories();
      }, 0);
    });

    // Cleanup on unmount
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (memories !== null) {
      localStorage.setItem("memories", JSON.stringify(memories));
    }
  }, [memories]);

  return (
    <MemoriesContext.Provider value={{ memories, setMemories, getMemories }}>
      {children}
    </MemoriesContext.Provider>
  );
};
