import React from "react";
//link
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cookies } from "next/headers";
import { User } from "@supabase/supabase-js";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import UserMenu from "./UserMenu";
import type { Database } from "@/types/supabase";

export default async function Header({ user }: { user: User }) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  //logout route /auth/logOut
  return (
    <header className="w-full h-16 flex bg-background items-center px-6 fixed top-0 shadow-2xl shadow-background">
      <Link href="/">
        <div>test</div>
      </Link>

      {user ? (
        <UserMenu />
      ) : (
        <Link
          href="./login"
          className="bg-btn-background ml-auto rounded-3xl border-2 p-3 px-5 hover:border-btn-border-hover hover:scale-105 ease-in-out duration-200 border-btn-border shadow-btn-main shadow-white"
        >
          Login
        </Link>
      )}
    </header>
  );
}
