import React from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import type { Database } from "@/types/supabase";
import { GitIcon, Linkedin } from "@/components/Icons";

export default async function page() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data: countries } = await supabase.from("countries").select();

  return (
    <div className="flex-1 h-[calc(100vh-56px)] flex flex-col items-center justify-center">
      <div className="self-center flex-col flex max-w-[90%]">
        <div
          className={`self-center bg-background-with-opacity w-fit rounded-lg p-10  text-center`}
        >
          <h1 className="">Teo Maximilien</h1>
          <div className="flex w-full items-center justify-center gap-4">
            <Link target="_blank" href="https://github.com/teotoivo">
              <GitIcon className="self-center w-12" />
            </Link>
            <Link
              target="_blank"
              href="https://www.linkedin.com/in/teo-maximilien/"
            >
              <Linkedin className="self-center w-12" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
