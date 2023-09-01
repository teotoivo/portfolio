import React from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Database } from "@/types/supabase";
import MainCard from "@/components/MainCard";

export default async function page() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data: countries } = await supabase.from("countries").select();

  return (
    <div className="flex-1 ">
      <div className="h-fit bg-main bg-fixed bg-cover flex  flex-col">
        <MainCard />
      </div>
    </div>
  );
}
