import React from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/types/supabase";
import { cookies } from "next/headers";

export default async function page() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  let { data: profiles, error } = await supabase
    .from("profiles")
    .select("first_name, last_name");

  console.log(profiles);

  return (
    <div className="bg-main flex-1 bg-cover flex flex-col items-center justify-center">
      <div className="rounded-md bg-background-with-opacity p-10"></div>
    </div>
  );
}
