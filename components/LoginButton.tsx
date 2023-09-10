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

import { motion, AnimatePresence } from "framer-motion";

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
            <button
              className="rounded-3xl border-2 border-btn-border bg-btn-background p-1 px-5 shadow-btn-main"
              onClick={() => setShowLogin(!showLogin)}
            >
              <p>Login</p>
            </button>
          );
        } else {
          return <></>;
        }
      })()}
      <AnimatePresence mode="wait">
        {showLogin && (
          <Login setShowLogin={setShowLogin} setShowSignup={setShowSignup} />
        )}
        {showSignup && (
          <SignUp setShowLogin={setShowLogin} setShowSignup={setShowSignup} />
        )}
      </AnimatePresence>
    </>
  );
}
