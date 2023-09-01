"use client";

import React, { useState, useEffect, useRef, use } from "react";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";

export default function MainCard() {
  const supabase = createClientComponentClient();

  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    }
    getData();
  }, []);
  //loading screen
  return (
    <>
      <div className="w-full h-[calc(100vh-56px)] flex flex-col items-center justify-center">
        {loading ? (
          <div
            className={`self-center bg-background-with-opacity w-fit rounded-lg p-10 text-center`}
          >
            Loading...
          </div>
        ) : (
          <div
            className={`self-center bg-background-with-opacity w-fit rounded-lg p-10 max-w-[90%] text-center`}
          >
            <p>Work In Progress</p>
            <p>{session?.user.email}</p>
          </div>
        )}
      </div>
    </>
  );
}
