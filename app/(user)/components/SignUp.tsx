"use client";
import React, { useRef, useState } from "react";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter, useSearchParams } from "next/navigation";
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
  const supabase = createClientComponentClient<Database>();

  const [isPassValid, setIsPassValid] = useState(false);

  const readonlySearchParams = useSearchParams();
  const searchParams = new URLSearchParams(
    Array.from(readonlySearchParams.entries()),
  );

  const formRef = useRef<HTMLFormElement>(null);

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
            action="/user/auth/signup"
            method="POST"
            ref={formRef}
            onSubmit={async (e) => {
              if (!isPassValid) {
                e.preventDefault();
                return;
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
            <motion.button
              variants={formChildVariants}
              className="text-md underline"
              onClick={() => {
                searchParams.delete("error");
                searchParams.delete("type");
                searchParams.delete("message");
                setShowSignup(false);
                setShowLogin(true);
              }}
            >
              Login
            </motion.button>
            <ErrorComponent />
          </motion.form>
        </div>
      </OutsideAlerter>
    </motion.div>
  );
}
