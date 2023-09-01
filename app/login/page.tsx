"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import type { Database } from "@/types/supabase";
import Login from "./Login";

export default function page() {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const handleSignUp = async () => {
    await supabase.auth.signUp({
      email: "teo.maximilien@gmail.com",
      password: "123456",
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    router.refresh();
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <div className="rounded-md bg-background-with-opacity p-10 flex flex-col justify-center items-center">
        <Login />
      </div>
    </div>
  );
}
