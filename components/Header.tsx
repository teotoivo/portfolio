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
  // read the custom x-url header
  const header_url = headersList.get("x-url") || "";
  // get the first route
  const route = header_url.split("/")[3];

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
      <div className="absolute top-0 grid h-16 w-full grid-flow-col items-center gap-4 bg-background-with-opacity px-6"></div>
      <header className="fixed top-0 grid h-16 w-full  grid-flow-col items-center gap-4 px-6">
        <Link
          className="justify-self-start"
          href={route === "user" ? "/user" : "/"}
        >
          <h1 className="transition-all duration-150 ease-in-out hover:scale-105 hover:underline">
            Home
          </h1>
        </Link>
        <div className="flex h-full items-center gap-4 justify-self-end">
          <Link target="_blank" href="https://github.com/teotoivo" className="">
            <GitIcon className="w-12 self-center transition-all duration-150 ease-in-out hover:scale-110 hover:opacity-90" />
          </Link>
          <Link
            target="_blank"
            href="https://www.linkedin.com/in/teo-maximilien/"
            className="justify-self-cente transition-all duration-150 ease-in-out hover:scale-110 hover:opacity-90"
          >
            <Linkedin className="w-12" />
          </Link>
          <LoginButton session={session} />
        </div>
      </header>
    </>
  );
}
