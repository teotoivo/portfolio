import React from "react";
import SignUp from "./SignUp";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import type { Database } from "@/types/supabase";
import Login from "@/app/login/Login";

export default function page() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <div className="rounded-md bg-background-with-opacity p-10 flex flex-col justify-center items-center">
        <SignUp />
      </div>
    </div>
  );
}