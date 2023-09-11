import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));
  const first_name = String(formData.get("first_name"));
  const last_name = String(formData.get("last_name"));
  const age = String(formData.get("age"));

  const supabase = createRouteHandlerClient({ cookies });

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${requestUrl.origin}/user/auth/callback`,
      data: {
        first_name: first_name,
        last_name: last_name,
        age: age,
      },
    },
  });

  if (error) {
    return NextResponse.redirect(
      `${requestUrl.origin}/user?error=${error.message}&ype=signup`,
      {
        // a 301 status is required to redirect from a POST to a GET route
        status: 301,
      },
    );
  }

  return NextResponse.redirect(
    `${requestUrl.origin}/user?message=Check email to continue sign in process&type=signup`,
    {
      // a 301 status is required to redirect from a POST to a GET route
      status: 301,
    },
  );
}
