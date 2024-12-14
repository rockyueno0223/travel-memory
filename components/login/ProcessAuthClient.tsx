"use client";

import React, { useEffect } from 'react'
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/utils/supabase/client";

const ProcessAuthClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const action = searchParams.get("action");
  const email = searchParams.get("email");
  const password = searchParams.get("password");

  useEffect(() => {
    // Process auth in client to listen to auth event
    const processAuth = async () => {
      if (!email || !password) {
        router.push("/login?message=Missing credentials or action");
        return;
      }

      try {
        let error = null;

        if (action === "login") {
          const result = await supabase.auth.signInWithPassword({ email, password });
          error = result.error;
        } else if (action === "signup") {
          const result = await supabase.auth.signUp({ email, password });
          error = result.error;
        } else {
          router.push("/login?message=Invalid action");
          return;
        }

        if (error) {
          throw new Error(`${action} failed: ${error.message}`);
        }

        router.push("/top");
      } catch (error) {
        console.error(error);
        router.push(`/login?message=${action} failed`);
      }
    };

    processAuth();
  }, [action, email, password, router]);

  return <p>Processing {action}...</p>
}

export default ProcessAuthClient
