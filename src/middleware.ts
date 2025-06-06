import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const url = new URL(req.url);
  const { pathname } = url;
  const emailCookie = req.cookies.get("email_not_confirmed");

  // 🔒 Se o cookie existe e NÃO está em /verificar
  if (emailCookie && pathname !== "/verificar") {
    return NextResponse.redirect(new URL("/verificar", req.url));
  }

  // ❌ Se NÃO existe e está tentando acessar /verificar
  if (!emailCookie && pathname === "/verificar") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // ✅ Usuário autenticado → redireciona de login/cadastrar para dashboard
  if (req.auth) {
    if (pathname === "/login" || pathname === "/cadastrar") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  }

  // 🚫 Não autenticado tentando acessar áreas protegidas
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // ✅ Libera rotas públicas
  return NextResponse.next();
});

// Intercepta todas as rotas, exceto assets estáticos
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
