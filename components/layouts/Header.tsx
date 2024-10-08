"use client";

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { supabase } from "@/utils/supabase/client";

const Header: React.FC = () => {
  const router = useRouter();

  const [isClick, setIsClick] = useState<boolean>(false);
  const [sessionExist, setSessionExist] = useState<boolean>(false);

  const toggleNavbar = () => {
    setIsClick(!isClick);
  }

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      console.log('checkSession called');
      setSessionExist(!!session);
    };

    checkSession();

    // Listen to auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('onAuthStateChange called');
      setSessionExist(!!session);
    });

    // Cleanup on unmount
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
    } else {
      router.push('/login');
    }
  };

  return (
    <div>
      <header className='border-b border-neutral-200'>
        <div className='max-w-screen-xl mx-auto px-3 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-16'>
            <div className="flex items-center h-3/5">
              <div
                onClick={() => router.push(sessionExist ? '/top' : '/')}
                className="flex items-center gap-1 h-full flex-shrink font-bodoni hover:cursor-pointer"
              >
                <img
                  src="/images/logo.png"
                  alt="Logo"
                  className='h-full w-auto'
                />
                <span>Travel Memory</span>
              </div>
            </div>
            <div className="hidden md:block">
              <nav className="ml-4 flex items-center space-x-4">
                {sessionExist ? (
                  <>
                    <div
                      onClick={() => router.push('/top')}
                      className='hover:bg-[#f0f0f0] hover:text-[#030E34] rounded-lg p-2 hover:cursor-pointer'
                    >
                      Top
                    </div>
                    <div
                      onClick={() => router.push('/memoryManager?action=show&selectedCountry=null')}
                      className='hover:bg-[#f0f0f0] hover:text-[#030E34] rounded-lg p-2 hover:cursor-pointer'
                    >
                      Memories
                    </div>
                    <button
                      onClick={signOut}
                      className='hover:bg-[#f0f0f0] hover:text-[#030E34] rounded-lg p-2 hover:cursor-pointer'
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <div
                      onClick={() => router.push('/login')}
                      className='hover:bg-[#f0f0f0] hover:text-[#030E34] rounded-lg p-2 hover:cursor-pointer'
                    >
                      Login
                      </div>
                      <div
                        onClick={() => router.push('/login')}
                        className='hover:bg-[#f0f0f0] hover:text-[#030E34] rounded-lg p-2 hover:cursor-pointer'
                      >
                        Sign Up
                    </div>
                  </>
                )}
              </nav>
            </div>
            <div className="md:hidden flex items-center">
              <button
                className='inline-flex items-center justify-center rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
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
            {sessionExist ? (
              <>
                <div
                  onClick={() => router.push('/top')}
                  className='block hover:bg-[#f0f0f0] hover:text-[#030E34] rounded-lg p-2 hover:cursor-pointer'
                >
                  Top
                </div>
                <div
                  onClick={() => router.push('/memoryManager?action=show&selectedCountry=null')}
                  className='block hover:bg-[#f0f0f0] hover:text-[#030E34] rounded-lg p-2 hover:cursor-pointer'
                >
                  Memories
                </div>
                <button
                  onClick={signOut}
                  className='w-full text-left block hover:bg-[#f0f0f0] hover:text-[#030E34] rounded-lg p-2 hover:cursor-pointer'
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <div
                  onClick={() => router.push('/login')}
                  className='block hover:bg-[#f0f0f0] hover:text-[#030E34] rounded-lg p-2 hover:cursor-pointer'
                >
                  Login
                </div>
                <div
                  onClick={() => router.push('/login')}
                  className='block hover:bg-[#f0f0f0] hover:text-[#030E34] rounded-lg p-2 hover:cursor-pointer'
                >
                  Sign Up
                </div>
              </>
            )}
          </nav>
        </div>
      </header>
    </div>
  )
}

export default Header;
