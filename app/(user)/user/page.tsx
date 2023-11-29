import React from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import type { Database } from "@/types/supabase";
import { GitIcon, Linkedin } from "@/components/Icons";

export default async function page() {
  return (
    <div className="flex h-[calc(100vh-56px)] flex-1 flex-col items-center justify-center">
      <div className="flex max-w-[90%] flex-col self-center">
        <div
          className={`w-fit self-center rounded-lg bg-background-with-opacity p-10  text-center`}
        >
          <h1 className="">Welcome</h1>
        </div>
      </div>
    </div>
  );
}
