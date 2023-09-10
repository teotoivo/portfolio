"use client";
import React, { useState, useEffect, useRef } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter, usePathname } from "next/navigation";
import { motion, Variants } from "framer-motion";

import Link from "next/link";
import type { Database } from "@/types/supabase";
import { UserIcon } from "@/components/Icons";

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24, duration: 0.4 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.4 } },
};

function useOutsideAlerter(
  ref: React.RefObject<HTMLDivElement>,
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>,
  otherRef: React.RefObject<HTMLDivElement>,
) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: MouseEvent) {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node) &&
        !otherRef.current!.contains(event.target as Node)
      ) {
        setShowMenu(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

export default function UserMenu() {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const pathname = usePathname();

  const wrapperRef = useRef(null);
  const buttonRef = useRef(null);

  useOutsideAlerter(wrapperRef, setShowMenu, buttonRef);

  return (
    <motion.div
      initial={false}
      animate={showMenu ? "open" : "closed"}
      className=" h-12"
    >
      <motion.button
        ref={buttonRef}
        className="shadow-btn-main shadow-white duration-200 ease-in-out hover:scale-105 hover:border-btn-border-hover"
        onClick={() => setShowMenu(!showMenu)}
        whileTap={{ scale: 0.9 }}
      >
        <UserIcon className="h-12 w-12" />
      </motion.button>

      <motion.ul
        ref={wrapperRef}
        className={`absolute right-4 top-20 flex h-fit w-fit flex-col rounded-md bg-background-with-opacity p-4 shadow-btn-main shadow-btn-border`}
        variants={{
          open: {
            clipPath: "inset(0% 0% 0% 0% round 10px)",
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.7,
              delayChildren: 0.3,
              staggerChildren: 0.05,
            },
          },
          closed: {
            clipPath: "inset(10% 50% 90% 50% round 10px)",
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.7,
            },
          },
        }}
      >
        <motion.li variants={itemVariants}>
          <Link href={"/user/settings"}>
            <p>settings</p>
          </Link>
        </motion.li>
        <motion.li variants={itemVariants} className="">
          <button
            onClick={async () => {
              setShowMenu(false);

              await supabase.auth.signOut();
              router.push("/user");
              router.refresh();
            }}
          >
            <p>logout</p>
          </button>
        </motion.li>
      </motion.ul>
    </motion.div>
  );
}
