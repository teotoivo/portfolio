"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Session, User } from "@supabase/supabase-js";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import UserMenu from "./UserMenu";
import type { Database } from "@/types/supabase";
import LoginButton from "./LoginButton";
import { GitIcon, Linkedin } from "@/components/Icons";
import { useSearchParams } from "next/navigation";
import { Variants, motion } from "framer-motion";

export const dynamic = "force-dynamic";

const bgVariant: Variants = {
  initial: {
    opacity: 0,
    y: -100,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      type: "spring",
    },
  },
};
const ItemContainerVariant: Variants = {
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

const itemTransition = {
  duration: 0.2,
  type: "spring",
  mass: 1,
  stiffness: 120,
  damping: 18,
};
const sharedInitial = {
  opacity: 0,
};
const sharedAnimate = {
  opacity: 1,
  transition: itemTransition,
  x: 0,
};
const sharedExit = {
  opacity: 0,
  transition: itemTransition,
};

const itemHover = {
  scale: 1.1,
  opacity: 0.8,
  transition: {
    duration: 0.2,
    type: "spring",
  },
};
const noItemHover = {
  scale: 1,
  opacity: 1,
  transition: {
    duration: 0.2,
    type: "spring",
  },
};

const itemVariantLeft: Variants = {
  initial: {
    x: "-100vw",
    ...sharedInitial,
  },
  animate: {
    ...sharedAnimate,
  },
  exit: {
    x: "-100vw",
    ...sharedExit,
  },
};

const itemVariantRight: Variants = {
  initial: {
    x: "100vw",
    ...sharedInitial,
  },
  animate: {
    ...sharedAnimate,
  },
  exit: {
    x: "100vw",
    ...sharedExit,
  },
};

export default function Header() {
  const supabase = createClientComponentClient<Database>();

  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    async function getSession() {
      const {
        data: { session: session1 },
      } = await supabase.auth.getSession();
      setSession(session1);
    }
    getSession();
    supabase.auth.onAuthStateChange(async (event, newSession) => {
      if (event == "SIGNED_IN") {
        setSession(newSession);
      }
      if (event == "SIGNED_OUT") {
        setSession(null);
      }
    });
  }, []);

  //logout route /auth/logOut
  return (
    <motion.div initial="initial" animate="animate" exit="exit">
      <motion.div
        variants={bgVariant}
        className="absolute top-0 grid h-16 w-full grid-flow-col items-center gap-4 bg-background-with-opacity px-6"
      ></motion.div>
      <motion.header
        variants={ItemContainerVariant}
        className="fixed top-0 z-10 grid h-16  w-full grid-flow-col items-center gap-4 px-6"
      >
        <motion.div variants={itemVariantLeft}>
          <Link className="justify-self-start" href="/user">
            <motion.h1
              initial={{}}
              whileHover={{
                textDecoration: "underline",
                textDecorationThickness: "0.1rem",
                ...itemHover,
              }}
              className="w-max"
            >
              Home
            </motion.h1>
          </Link>
        </motion.div>

        <motion.div
          variants={ItemContainerVariant}
          className="flex h-full items-center gap-4 justify-self-end"
        >
          <div className="h-12">
            <LoginButton session={session} variant={itemVariantRight} />
          </div>
        </motion.div>
      </motion.header>
    </motion.div>
  );
}
