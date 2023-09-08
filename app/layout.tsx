import "./globals.css";

import Header from "../components/Header";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Database } from "@/types/supabase";

export const metadata = {
  title: "portfolio",
  description: "Teo Maximilien's personal portfolio",
};

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/images/favicon.svg" type="image/svg+xml" />
      </head>

      <body className="m-0 flex min-h-screen flex-col overflow-x-hidden">
        <Header />
        <div className="flex flex-1 flex-col bg-main bg-cover  bg-fixed">
          {children}
        </div>
      </body>
    </html>
  );
}
