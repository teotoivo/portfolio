import React from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import type { Database } from "@/types/supabase";

export default async function page() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data: countries } = await supabase.from("countries").select();

  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center ">
        <div className="flex max-w-[90%] flex-col self-center">
          <div
            className={` w-fit self-center rounded-lg bg-background-with-opacity p-16  text-center`}
          >
            <h1 className="">Teo Maximilien</h1>
          </div>
        </div>
      </div>
    </>
  );
}
