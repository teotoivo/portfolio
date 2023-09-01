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

  /* let { data: profiles, error: profileError } = await supabase
    .from("profiles")
    .select("first_name, last_name");

  if (profileError) throw profileError.message;
  console.log(profiles); */

  return (
    <div className="bg-main flex-1 bg-cover flex flex-col items-center justify-center">
      <div className="rounded-md bg-background-with-opacity p-10">
        <p>first name: {session?.user.user_metadata.first_name}</p>
        <p>last name: {session?.user.user_metadata.last_name}</p>
        <p>email: {session?.user.email}</p>
      </div>
    </div>
  );
}
