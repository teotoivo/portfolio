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
      <div className="h-screen flex flex-col items-center justify-center ">
        <div className="self-center flex-col flex max-w-[90%]">
          <div
            className={` self-center bg-background-with-opacity w-fit rounded-lg p-16  text-center`}
          >
            <h1 className="">Teo Maximilien</h1>
          </div>
        </div>
      </div>
      <div className="h-[1000px] bg-red-500 w-1/2"></div>
    </>
  );
}
