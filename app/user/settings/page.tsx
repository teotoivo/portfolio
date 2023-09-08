import React from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/types/supabase";
import { cookies } from "next/headers";

export default async function page() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError) throw sessionError.message;

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <div className="rounded-md bg-background-with-opacity p-10 flex flex-col justify-center items-center">
        <p>first name: {session?.user.user_metadata.first_name}</p>
        <p>last name: {session?.user.user_metadata.last_name}</p>
        <p>email: {session?.user.email}</p>
      </div>
    </div>
  );
}
