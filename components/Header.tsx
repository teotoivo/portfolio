import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cookies, headers } from "next/headers";
import { User } from "@supabase/supabase-js";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import UserMenu from "./UserMenu";
import type { Database } from "@/types/supabase";
import LoginButton from "./LoginButton";

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
    <header className="w-full h-16 flex bg-background items-center px-6 fixed top-0 shadow-2xl shadow-background">
      <Link href="/">
        <p>test</p>
      </Link>

      <LoginButton session={session} />
    </header>
  );
}
