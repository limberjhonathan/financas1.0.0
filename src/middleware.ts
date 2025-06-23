// middleware.ts
import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function middleware(req: NextRequest) {
  const session = await auth(); // obtém sessão do usuário
  const url = new URL(req.url);
  const { pathname } = url;
  const emailCookie = req.cookies.get("email_not_confirmed");

  if (pathname.startsWith("/api")) {
    return NextResponse.next(); // ⚠️ Libera todas as rotas da API
  }

  // 🔒 Se o cookie existe e NÃO está em /verificar → redireciona
  if (emailCookie && pathname !== "/verificar") {
    return NextResponse.redirect(new URL("/verificar", req.url));
  }

  // ❌ Se NÃO existe o cookie e está tentando acessar /verificar → redireciona
  if (!emailCookie && pathname === "/verificar") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // ✅ Se está autenticado → redireciona login/cadastrar para dashboard
  if (session) {
    if (pathname === "/login" || pathname === "/cadastrar") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  }

  // 🚫 Se não está autenticado e tenta acessar áreas protegidas
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // ✅ Libera rotas públicas
  return NextResponse.next();
}

// Intercepta todas as rotas, exceto assets estáticos e imagens
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
