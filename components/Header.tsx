"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Session, User } from "@supabase/supabase-js";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import UserMenu from "./UserMenu";
import type { Database } from "@/types/supabase";
import LoginButton from "./LoginButton";
import { GitIcon, Linkedin } from "@/components/Icons";
import { usePathname } from "next/navigation";
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

  const path = usePathname();

  const route = path.split("/")[1];

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
        className="fixed top-0 z-50 grid h-16  w-full grid-flow-col items-center gap-4 px-6"
      >
        <motion.div variants={itemVariantLeft}>
          <Link
            className="justify-self-start"
            href={route === "user" ? "/user" : "/"}
          >
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
          <motion.div variants={itemVariantRight}>
            <Link
              target="_blank"
              href="https://github.com/teotoivo"
              className=""
            >
              <motion.div whileHover={itemHover}>
                <GitIcon className="w-12 self-center transition-all duration-150 ease-in-out" />
              </motion.div>
            </Link>
          </motion.div>

          <motion.div variants={itemVariantRight}>
            <Link
              target="_blank"
              href="https://www.linkedin.com/in/teo-maximilien/"
              className="justify-self-cente transition-all duration-150 ease-in-out"
            >
              <motion.div whileHover={itemHover}>
                <Linkedin className="w-12" />
              </motion.div>
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                delay: 0.3,
                duration: 3,
                type: "spring",
              },
            }}
          >
            <motion.div whileHover={itemHover} className="h-12 w-12">
              <LoginButton session={session} />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.header>
    </motion.div>
  );
}
