import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse  } from "next/server";

export async function middleware(req){
  const res = NextResponse.next()

  const publicUrls = ['/reset'];

  if (publicUrls.includes(req.nextUrl.pathname)) {
    return res;  // allow public urls
  }

  const supabase  = createMiddlewareClient({
    req,res
  })
  const {
    data : {
      session
    }
  } = await supabase.auth.getSession()

  console.log(session, "SESSSIOSNSNSNSN")
  if (!session) {
    return NextResponse.rewrite(new URL("/login", req.url))
  }
  return res;
}

export const config = {
  matcher : [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ]
}