"use client";
import React, { useState, useEffect, useRef } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter, usePathname } from "next/navigation";

import Link from "next/link";
import type { Database } from "@/types/supabase";

function useOutsideAlerter(
  ref: React.RefObject<HTMLDivElement>,
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>,
  otherRef: React.RefObject<HTMLDivElement>
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

  useEffect(() => {
    setShowMenu(false);
  }, [pathname]);

  return (
    <>
      <button
        ref={buttonRef}
        className=" bg-btn-background ml-auto rounded-full  hover:border-btn-border-hover hover:scale-105 ease-in-out duration-200 shadow-btn-main shadow-white"
        onClick={() => setShowMenu(!showMenu)}
      >
        {" "}
        <img src="/user.png" alt="" className="h-12 dark:invert" />
      </button>

      <div
        ref={wrapperRef}
        className={`absolute top-20 bg-background-with-opacity right-4 h-fit w-fit shadow-btn-main shadow-btn-border rounded-md flex p-4 flex-col ${
          !showMenu ? "scale-0" : "scale-100"
        } transform transition-all duration-100 ease-in-out`}
      >
        <Link href={"/settings"}>
          <p>settings</p>
        </Link>
        <button
          onClick={async () => {
            setShowMenu(false);

            await supabase.auth.signOut();
            router.push("/");
            router.refresh();
          }}
        >
          <p>logout</p>
        </button>
      </div>
    </>
  );
}
