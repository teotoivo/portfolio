"use client";
import React, { useRef } from "react";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import type { Database } from "@/types/supabase";
import Link from "next/link";
import { AuthResponse } from "@supabase/supabase-js";

export default function SignUp() {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSignUp = async (
    email: string,
    password: string,
    first_name: string,
    last_name: string,
    age: string
  ) => {
    const {
      data: { user, session },
      error,
    }: AuthResponse = await supabase.auth.signUp({
      email: "teo.maximilien@gmail.com",
      password: "123456",
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (error) throw error.message;
    supabase.from("profiles").insert({
      id: user!.id,
      first_name,
      last_name,
      age,
    });
    router.refresh();
  };
  return (
    <>
      <p>Sign Up</p>
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
          const first_name = formRef.current?.elements.namedItem(
            "first_name"
          ) as HTMLInputElement;
          const last_name = formRef.current?.elements.namedItem(
            "last_name"
          ) as HTMLInputElement;
          const age = formRef.current?.elements.namedItem(
            "age"
          ) as HTMLInputElement;
          handleSignUp(
            email.value,
            password.value,
            first_name.value,
            last_name.value,
            age.value
          );
        }}
      >
        <input
          type="text"
          name="email"
          id="email"
          className="bg-background p-1 rounded-md border-2 border-btn-border"
          required
        />
        <input
          type="password"
          name="password"
          id="password"
          className="bg-background p-1 rounded-md border-2 border-btn-border"
          required
        />
        <input
          type="text"
          name="first_name"
          id="first_name"
          className="bg-background p-1 rounded-md border-2 border-btn-border"
          required
        />
        <input
          type="text"
          name="last_name"
          id="last_name"
          className="bg-background p-1 rounded-md border-2 border-btn-border"
          required
        />
        <input
          type="text"
          name="age"
          id="age"
          className="bg-background p-1 rounded-md border-2 border-btn-border"
          required
        />
        <button
          type="submit"
          className="bg-btn-background border-2 border-btn-border p-2 rounded-lg hover:scale-105 transition-all hover:border-btn-border-hover"
        >
          Login
        </button>
        <Link href="/" className="text-md underline">
          Sign Up
        </Link>
      </form>
    </>
  );
}
