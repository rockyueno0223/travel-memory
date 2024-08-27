"use client";

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const Header: React.FC = () => {
  const router = useRouter();

  const [isClick, setIsClick] = useState<boolean>(false);

  const toggleNavbar = () => {
    setIsClick(!isClick);
  }

  return (
    <div>
      <header className='bg-black'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-16'>
            <div className="flex items-center">
              <div className="flex-shrink">
                <div
                  onClick={() => router.push('/top')}
                  className='text-white hover:cursor-pointer'
                >
                  Logo
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <nav className="ml-4 flex items-center space-x-4">
                <div
                  onClick={() => router.push('/top')}
                  className='text-white hover:bg-white hover:text-black rounded-lg p-2 hover:cursor-pointer'
                >
                  Top
                </div>
                <div
                  onClick={() => router.push('/memoryManager?action=show&selectedCountry=null')}
                  className='text-white hover:bg-white hover:text-black rounded-lg p-2 hover:cursor-pointer'
                >
                  Memories
                </div>
              </nav>
            </div>
            <div className="md:hidden flex items-center">
              <button
                className='inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                onClick={toggleNavbar}>
                {isClick ? (
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor" >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16m-7 6h7"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div className={`md:hidden overflow-hidden transition-all duration-700 ease-in-out ${ isClick ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0' }`}>
          <nav className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <div
              onClick={() => router.push('/top')} className='text-white block hover:bg-white hover:text-black rounded-lg p-2 hover:cursor-pointer'
            >
              Top
            </div>
            <div
              onClick={() => router.push('/memoryManager?action=show&selectedCountry=null')}
              className='text-white block hover:bg-white hover:text-black rounded-lg p-2 hover:cursor-pointer'
            >
              Memories
            </div>
          </nav>
        </div>
      </header>
    </div>
  )
}

export default Header;
