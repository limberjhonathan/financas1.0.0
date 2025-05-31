import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  if (req.auth) {
    // Se autenticado, pode acessar dashboard, mas bloqueia login/register
    const url = new URL(req.url);
    if (url.pathname === "/login" || url.pathname === "/cadastrar") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  }

  // Se não autenticado, pode acessar login/register, mas bloqueia dashboard/admin
  const url = new URL(req.url);
  if (url.pathname.startsWith("/dashboard") || url.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/login", "/cadastrar", "/dashboard/:path*", "/admin/:path*"],
};
