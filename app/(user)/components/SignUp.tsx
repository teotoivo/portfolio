"use client";
import React, { useRef, useState } from "react";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import type { Database } from "@/types/supabase";
import Link from "next/link";
import { AuthResponse } from "@supabase/supabase-js";
import ErrorComponent from "@/app/(user)/components/ErrorComponent";

import OutsideAlerter from "../../../components/OutsideAlerter";

import { Variants, motion } from "framer-motion";

import { bgVariants, formChildVariants, formVariants } from "./Login";

export default function SignUp({
  setShowLogin,
  setShowSignup,
}: {
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSignup: React.Dispatch<React.SetStateAction<boolean>>;
}) {
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
    age: string,
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
    <motion.div
      className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center bg-background-with-opacity"
      variants={bgVariants}
      key={"signup"}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <OutsideAlerter
        callback={() => {
          setShowSignup(false);
        }}
      >
        <div className=" flex h-fit w-fit flex-col items-center justify-center rounded-md bg-background-with-opacity p-10">
          <p>Sign Up</p>
          <motion.form
            variants={formVariants}
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
              const confirm_password = formRef.current?.elements.namedItem(
                "confirm_password",
              ) as HTMLInputElement;
              const first_name = formRef.current?.elements.namedItem(
                "first_name",
              ) as HTMLInputElement;
              const last_name = formRef.current?.elements.namedItem(
                "last_name",
              ) as HTMLInputElement;
              const age = formRef.current?.elements.namedItem(
                "age",
              ) as HTMLInputElement;
              if (password.value === confirm_password.value) {
                setShowSignup(false);
                handleSignUp(
                  email.value,
                  password.value,
                  first_name.value,
                  last_name.value,
                  age.value,
                );
              } else {
                displayError("Passwords do not match");
              }
            }}
          >
            <motion.input
              variants={formChildVariants}
              type="text"
              name="email"
              id="email"
              className="rounded-md border-2 border-btn-border bg-background p-1"
              required
              placeholder="Email"
            />
            <motion.input
              variants={formChildVariants}
              type="password"
              name="password"
              id="password"
              className="rounded-md border-2 border-btn-border bg-background p-1"
              required
              placeholder="Password"
            />
            <motion.input
              variants={formChildVariants}
              type="password"
              name="confirm_password"
              id="confirm_password"
              className={`rounded-md border-2 border-btn-border bg-background p-1 focus:outline-none ${
                isPassValid ? "border-green-500" : "border-red-500"
              }`}
              required
              placeholder="Confirm Password"
              onChange={(e) => {
                const password = formRef.current?.elements.namedItem(
                  "password",
                ) as HTMLInputElement;
                if (e.target.value === password.value) {
                  setIsPassValid(true);
                } else {
                  setIsPassValid(false);
                }
              }}
            />
            <motion.input
              variants={formChildVariants}
              type="text"
              name="first_name"
              id="first_name"
              className="rounded-md border-2 border-btn-border bg-background p-1"
              required
              placeholder="First Name"
            />
            <motion.input
              variants={formChildVariants}
              type="text"
              name="last_name"
              id="last_name"
              className="rounded-md border-2 border-btn-border bg-background p-1"
              required
              placeholder="Last Name"
            />
            <motion.input
              variants={formChildVariants}
              type="text"
              name="age"
              id="age"
              className="rounded-md border-2 border-btn-border bg-background p-1"
              required
              placeholder="Age"
            />
            <motion.button
              variants={formChildVariants}
              type="submit"
              className="rounded-lg border-2 border-btn-border bg-btn-background p-2 transition-all hover:scale-105 hover:border-btn-border-hover"
            >
              Sign up
            </motion.button>
            <ErrorComponent error={error} />
            <motion.button
              variants={formChildVariants}
              className="text-md underline"
              onClick={() => {
                setShowSignup(false);
                setShowLogin(true);
              }}
            >
              Login
            </motion.button>
          </motion.form>
        </div>
      </OutsideAlerter>
    </motion.div>
  );
}
