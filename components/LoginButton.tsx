"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import UserMenu from "./UserMenu";
import Login from "@/components/Login";
import SignUp from "@/components/SignUp";

export default function LoginButton({ session }: { session: Session | null }) {
  const path = usePathname();
  const supabase = createClientComponentClient<Database>();
  const routePath = path.split("/")[1];
  const [showLogin, setShowLogin] = React.useState(false);
  const [showSignup, setShowSignup] = React.useState(false);

  return (
    <>
      {(() => {
        if (routePath == "user") {
          return session?.user ? (
            <UserMenu />
          ) : (
            /*<Link
              href="./user/login"
              className="bg-btn-background rounded-3xl border-2 p-2 px-5 hover:border-btn-border-hover hover:scale-105 ease-in-out duration-200 border-btn-border shadow-btn-main shadow-white"
            >
              <p>Login</p>
            </Link>*/
            <button
              className="rounded-3xl border-2 border-btn-border bg-btn-background p-2 px-5 shadow-btn-main shadow-white duration-200 ease-in-out hover:scale-105 hover:border-btn-border-hover"
              onClick={() => setShowLogin(!showLogin)}
            >
              <p>Login</p>
            </button>
          );
        } else {
          return <></>;
        }
      })()}
      {showLogin ? (
        <Login setShowLogin={setShowLogin} setShowSignup={setShowSignup} />
      ) : (
        <></>
      )}
      {showSignup ? (
        <SignUp setShowLogin={setShowLogin} setShowSignup={setShowSignup} />
      ) : (
        <></>
      )}
    </>
  );
}
