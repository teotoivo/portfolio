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
  const [height, setHeight] = useState(0);
  const ref: React.RefObject<HTMLDivElement> = useRef(null);

  useEffect(() => {
    async function getData() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    }
    getData();
    if (ref.current) {
      setHeight(ref.current.clientHeight);
      console.log(height);
    }
  }, []);
  //loading screen
  return (
    <>
      {loading ? (
        <div
          ref={ref}
          className={`self-center bg-background-with-opacity w-fit rounded-lg p-10 my-[50vh] text-center`}
        >
          Loading...
        </div>
      ) : (
        <div
          ref={ref}
          className={`self-center bg-background-with-opacity w-fit rounded-lg p-10 my-[50vh] text-center`}
        >
          Work In Progress
          {session!.user!.email}
        </div>
      )}
    </>
  );
}
