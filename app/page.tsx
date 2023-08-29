import React from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function page() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <div className="flex-1 ">
      <div className="h-screen bg-[url('/background.jpg')] bg-fixed bg-cover flex justify-center">
        <div className="bg-background w-2/3 p-10 my-auto text-center">
          Work In Progress
          {session?.user?.email}
        </div>
      </div>
    </div>
  );
}
