import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const url = new URL(req.url);
  const { pathname } = url;

  // 🔒 BLOQUEAR ACESSO À /verificar SEM O COOKIE
  if (pathname === "/verificar") {
    const emailCookie = req.cookies.get("email_not_confirmed");

    // Se não tiver o cookie, redireciona para login
    if (!emailCookie) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // ✅ USUÁRIO AUTENTICADO
  if (req.auth) {
    if (pathname === "/login" || pathname === "/cadastrar") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  }

  // 🚫 USUÁRIO NÃO AUTENTICADO
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
});

// 👉 Adicione /verificar ao matcher
export const config = {
  matcher: ["/login", "/cadastrar", "/verificar", "/dashboard/:path*", "/admin/:path*"],
};
