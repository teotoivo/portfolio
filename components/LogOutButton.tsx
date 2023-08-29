"use client";
import React from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function LogOutButton() {
  const supabase = createClientComponentClient<Database>();

  return (
    <div
      onClick={async () => {
        console.log("logout");

        await supabase.auth.signOut();
        window.location.reload();
      }}
    >
      logout
    </div>
  );
}
