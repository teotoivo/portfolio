"use client";
import React, { useRef, useState } from "react";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import type { Database } from "@/types/supabase";
import Link from "next/link";
import { AuthResponse } from "@supabase/supabase-js";
import ErrorComponent from "@/components/ErrorComponent";

export default function SignUp() {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const formRef = useRef<HTMLFormElement>(null);
  const [isPassValid, setIsPassValid] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const displayError = (message: string) => {
    setError(message);
  };

  supabase.auth.onAuthStateChange((event, session) => {
    if (event == "SIGNED_IN") {
      router.push("/user");
    }
  });

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
      email: email,
      password: password,
      options: {
        emailRedirectTo: `${location.origin}/user/auth/callback`,
        data: {
          first_name: first_name,
          last_name: last_name,
          age: age,
        },
      },
    });

    if (error) displayError(error.message);

    router.push(`/user/verifyemail?email=${email}`);
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
          const confirm_password = formRef.current?.elements.namedItem(
            "confirm_password"
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
          if (password.value === confirm_password.value) {
            handleSignUp(
              email.value,
              password.value,
              first_name.value,
              last_name.value,
              age.value
            );
          } else {
            displayError("Passwords do not match");
          }
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
        <input
          type="password"
          name="confirm_password"
          id="confirm_password"
          className={`focus:outline-none bg-background p-1 rounded-md border-2 border-btn-border ${
            isPassValid ? "border-green-500" : "border-red-500"
          }`}
          required
          placeholder="Confirm Password"
          onChange={(e) => {
            const password = formRef.current?.elements.namedItem(
              "password"
            ) as HTMLInputElement;
            if (e.target.value === password.value) {
              setIsPassValid(true);
            } else {
              setIsPassValid(false);
            }
          }}
        />
        <input
          type="text"
          name="first_name"
          id="first_name"
          className="bg-background p-1 rounded-md border-2 border-btn-border"
          required
          placeholder="First Name"
        />
        <input
          type="text"
          name="last_name"
          id="last_name"
          className="bg-background p-1 rounded-md border-2 border-btn-border"
          required
          placeholder="Last Name"
        />
        <input
          type="text"
          name="age"
          id="age"
          className="bg-background p-1 rounded-md border-2 border-btn-border"
          required
          placeholder="Age"
        />
        <button
          type="submit"
          className="bg-btn-background border-2 border-btn-border p-2 rounded-lg hover:scale-105 transition-all hover:border-btn-border-hover"
        >
          Sign up
        </button>
        <ErrorComponent error={error} />
        <Link href="/user/login" className="text-md underline">
          Login
        </Link>
      </form>
    </>
  );
}
