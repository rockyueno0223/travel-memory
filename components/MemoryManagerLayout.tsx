'use client';

import React from "react";

interface MemoryManagerLayoutProps {
  formData: {
    action: string;
    countryCode: string;
  }
}

const TopLayout: React.FC<MemoryManagerLayoutProps> = ({ formData }) => {

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      MemoryManager
      {formData.action}
      {formData.countryCode}
    </div>
  )
}

export default TopLayout;
