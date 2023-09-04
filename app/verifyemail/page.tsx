"use client";
import React, { useRef } from "react";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import type { Database } from "@/types/supabase";
import Link from "next/link";
import { AuthResponse } from "@supabase/supabase-js";

export default function page() {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const formRef = useRef<HTMLFormElement>(null);

  async function handleVerify(code: HTMLInputElement) {
    //get search params
    const searchParams = new URLSearchParams(window.location.search);
    const email = searchParams.get("email");

    if (!email) return console.log("no email");

    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token: code.value,
      type: "email",
    });

    if (error) console.log(error);

    if (data) {
      router.push("/");
      router.refresh();
    }
  }

  return (
    <>
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="rounded-md bg-background-with-opacity p-10 flex flex-col justify-center items-center">
          <p>Verify email</p>
          <form
            className="flex flex-col justify-center items-center gap-4"
            action=""
            ref={formRef}
          >
            <input
              type="text"
              name="code"
              id="code"
              placeholder="verification code"
              className="bg-background p-1 rounded-md border-2 border-btn-border"
              inputMode="numeric"
              pattern="[0-9]{6}"
            />
            <button
              className="bg-btn-background rounded-md p-2 px-4 text-white"
              onClick={(e) => {
                e.preventDefault();
                const code = formRef.current?.elements.namedItem(
                  "code"
                ) as HTMLInputElement;
                handleVerify(code);
              }}
            >
              Verify
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
