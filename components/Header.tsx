import React from "react";
//link
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cookies } from "next/headers";
import { User } from "@supabase/supabase-js";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import LogOutButton from "./LogOutButton";

export default async function Header({ user }: { user: User }) {
  console.log(user);

  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  //logout route /auth/logOut
  return (
    <header className="w-full h-16 flex bg-background items-center px-6 fixed shadow-2xl shadow-background">
      <div>test</div>
      {user ? (
        <>
          <button className=" bg-btn-background ml-auto rounded-full border-2 hover:border-btn-border-hover hover:scale-105 ease-in-out duration-200 border-btn-border shadow-btn-main shadow-white">
            <img src="/user.png" alt="" className="h-12 dark:invert" />
          </button>
          <div className="absolute top-20 right-4 h-fit w-fit bg-background shadow-btn-main shadow-btn-border rounded-md flex p-4 flex-col">
            <div className="">dashboard</div>
            <div className="">settings</div>
            <LogOutButton />
          </div>
        </>
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
