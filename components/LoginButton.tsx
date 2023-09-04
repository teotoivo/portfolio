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

export default function LoginButton({ session }: { session: Session | null }) {
  const path = usePathname();
  const supabase = createClientComponentClient<Database>();
  const routePath = path.split("/")[1];

  return (
    <>
      {(() => {
        if (routePath == "user") {
          return session?.user ? (
            <UserMenu />
          ) : (
            <Link
              href="./user/login"
              className="bg-btn-background ml-auto rounded-3xl border-2 p-2 px-5 hover:border-btn-border-hover hover:scale-105 ease-in-out duration-200 border-btn-border shadow-btn-main shadow-white"
            >
              <p>Login</p>
            </Link>
          );
        } else {
          return <></>;
        }
      })()}
    </>
  );
}
