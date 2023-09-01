"use client";
import React, { useRef } from "react";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import type { Database } from "@/types/supabase";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const formRef = useRef<HTMLFormElement>(null);

  function displayError(message: string) {
    alert(message);
  }

  const handleSignIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    router.push("/");
    router.refresh();
    if (error) displayError(error.message);
  };
  return (
    <>
      <p>Login</p>
      <form
        className="flex flex-col justify-center items-center gap-4"
        action=""
        ref={formRef}
        onSubmit={(e) => {
          e.preventDefault();
          const email = formRef.current?.elements.namedItem(
            "email"
          ) as HTMLInputElement;
          const password = formRef.current?.elements.namedItem(
            "password"
          ) as HTMLInputElement;
          handleSignIn(email.value, password.value);
        }}
      >
        <input
          type="text"
          name="email"
          id="email"
          className="bg-background p-1 rounded-md border-2 border-btn-border"
          required
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          id="password"
          className="bg-background p-1 rounded-md border-2 border-btn-border"
          required
          placeholder="Password"
        />
        <button
          type="submit"
          className="bg-btn-background border-2 border-btn-border p-2 rounded-lg hover:scale-105 transition-all hover:border-btn-border-hover"
        >
          Login
        </button>
        <Link href="/signup" className="text-md underline">
          Sign Up
        </Link>
      </form>
    </>
  );
}
