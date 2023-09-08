"use client";
import React, { useRef } from "react";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import type { Database } from "@/types/supabase";
import Link from "next/link";
import { Variants, motion } from "framer-motion";

import OutsideAlerter from "./OutsideAlerter";

export const bgVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.6,
      delay: 0.1,
    },
  },
};

export const formVariants: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export const formChildVariants: Variants = {
  initial: {
    opacity: 0,
    x: "-100%",
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      type: "spring",
      weight: 0.5,
    },
  },
  exit: {
    opacity: 0,
    x: "-100%",
    transition: {
      duration: 0.3,
    },
  },
};

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
    <motion.div
      key={"login"}
      variants={bgVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center bg-background-with-opacity"
    >
      <OutsideAlerter
        callback={() => {
          setShowLogin(false);
        }}
      >
        <div className=" flex h-fit w-fit flex-col items-center justify-center rounded-md bg-background-with-opacity p-10">
          <p>Login</p>
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
              handleSignIn(email.value, password.value);
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
            <motion.button
              className="rounded-lg border-2 border-btn-border bg-btn-background p-2 "
              variants={formChildVariants}
              type="submit"
              whileHover={{
                scale: 1.05,
                borderColor: "var(--btn-border-hover)",
              }}
            >
              Login
            </motion.button>
            <motion.button
              variants={formChildVariants}
              className="text-md underline"
              onClick={() => {
                setShowLogin(false);
                setShowSignup(true);
              }}
            >
              Sign Up
            </motion.button>
          </motion.form>
        </div>
      </OutsideAlerter>
    </motion.div>
  );
}
