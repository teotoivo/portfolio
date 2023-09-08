"use client";
import React, { useRef } from "react";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import type { Database } from "@/types/supabase";
import Link from "next/link";

export default function Login({
  setShowLogin,
  setShowSignup,
}: {
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSignup: React.Dispatch<React.SetStateAction<boolean>>;
}) {
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
    router.push("/user");
    router.refresh();
    if (error) displayError(error.message);
  };
  return (
    <>
      <div className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center bg-background-with-opacity">
        <div className=" flex h-fit w-fit flex-col items-center justify-center rounded-md bg-background-with-opacity p-10">
          <p>Login</p>
          <form
            className="flex flex-col items-center justify-center gap-4"
            action=""
            ref={formRef}
            onSubmit={(e) => {
              e.preventDefault();
              const email = formRef.current?.elements.namedItem(
                "email",
              ) as HTMLInputElement;
              const password = formRef.current?.elements.namedItem(
                "password",
              ) as HTMLInputElement;
              handleSignIn(email.value, password.value);
            }}
          >
            <input
              type="text"
              name="email"
              id="email"
              className="rounded-md border-2 border-btn-border bg-background p-1"
              required
              placeholder="Email"
            />
            <input
              type="password"
              name="password"
              id="password"
              className="rounded-md border-2 border-btn-border bg-background p-1"
              required
              placeholder="Password"
            />
            <button
              type="submit"
              className="rounded-lg border-2 border-btn-border bg-btn-background p-2 transition-all hover:scale-105 hover:border-btn-border-hover"
            >
              Login
            </button>
            <button
              className="text-md underline"
              onClick={() => {
                setShowLogin(false);
                setShowSignup(true);
              }}
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
