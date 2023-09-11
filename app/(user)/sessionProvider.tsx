"use client";

import React, { useEffect } from "react";
//import recoil
import { RecoilRoot } from "recoil";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function sessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClientComponentClient();
  useEffect(() => {
    async function getSession() {
      const {
        data: { session: session1 },
      } = await supabase.auth.getSession();
    }
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        console.log("SIGNED_IN");
      }
      if (event === "SIGNED_OUT") {
        console.log("SIGNED_OUT");
      }
    });
  }, []);

  return <RecoilRoot>{children}</RecoilRoot>;
}
