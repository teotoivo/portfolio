import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cookies, headers } from "next/headers";
import { User } from "@supabase/supabase-js";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import UserMenu from "./UserMenu";
import type { Database } from "@/types/supabase";
import LoginButton from "./LoginButton";
import { GitIcon, Linkedin } from "@/components/Icons";

export const dynamic = "force-dynamic";

export default async function Header() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const headersList = headers();

  let {
    data: { session },
  } = await supabase.auth.getSession();

  //rename the session param to newSession

  supabase.auth.onAuthStateChange(async (event, newSession) => {
    if (event == "SIGNED_IN") {
      session = newSession;
    }
    if (event == "SIGNED_OUT") {
      session = null;
    }
  });

  //logout route /auth/logOut
  return (
    <>
      <div className="w-full gap-4 h-16 grid grid-flow-col  items-center px-6 top-0 bg-background-with-opacity absolute"></div>
      <header className="w-full gap-4 h-16 grid grid-flow-col  items-center px-6 fixed top-0">
        <Link className="justify-self-start" href="/">
          <h1 className="hover:underline hover:scale-105 transition-all duration-150 ease-in-out">
            Home
          </h1>
        </Link>
        <div className="flex justify-self-end gap-4 h-full items-center">
          <Link target="_blank" href="https://github.com/teotoivo" className="">
            <GitIcon className="self-center w-12 hover:scale-110 transition-all duration-150 ease-in-out hover:opacity-90" />
          </Link>
          <Link
            target="_blank"
            href="https://www.linkedin.com/in/teo-maximilien/"
            className="justify-self-center hover:scale-110 transition-all duration-150 ease-in-out hover:opacity-90"
          >
            <Linkedin className="w-12" />
          </Link>
          <LoginButton session={session} />
        </div>
      </header>
    </>
  );
}
