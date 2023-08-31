"use client";
import React from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import type { Database } from "@/types/supabase";

export default function UserMenu() {
  const supabase = createClientComponentClient<Database>();

  return (
    <>
      <button className=" bg-btn-background ml-auto rounded-full  hover:border-btn-border-hover hover:scale-105 ease-in-out duration-200 shadow-btn-main shadow-white">
        <img src="/user.png" alt="" className="h-12 dark:invert" />
      </button>
      <div className="absolute top-20 bg-background-with-opacity right-4 h-fit w-fit shadow-btn-main shadow-btn-border rounded-md flex p-4 flex-col">
        <div className="">dashboard</div>
        <div className="">settings</div>
        <div
          onClick={async () => {
            console.log("logout");

            await supabase.auth.signOut();
            window.location.reload();
          }}
        >
          logout
        </div>
      </div>
    </>
  );
}
