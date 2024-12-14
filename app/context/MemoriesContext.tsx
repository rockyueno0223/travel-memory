"use client";

import { Memory } from "@/types";
import { createContext, useContext } from "react";

interface MemoriesContextType {
  memories: Memory[] | null;
  setMemories: React.Dispatch<React.SetStateAction<Memory[] | null>>;
  getMemories: () => void;
}

export const MemoriesContext = createContext<MemoriesContextType | undefined>(undefined);

export const useMemoriesContext = () => {
  const context = useContext(MemoriesContext);
  if (!context) {
    throw new Error('useMemoriesContext must be used within an MemoriesProvider');
  }
  return context;
};
