import Link from "next/link";
import Image from "next/image";
import { ButtonLink } from "../components/buttonLinkHome";
import { auth } from "@/auth";
export async function Hero() {
  const session = await auth();
  return (
    <header>
      <nav className="flex justify-between items-center px-[3em] py-[1em] shadow-lg">
        <Link href="/" className="w-[100px] h-[60px]">
          <Image className="h-full w-full object-contain" src="/logo/logo.png" alt="Logo" width={100} height={100} priority />
        </Link>
        <h1 className="uppercase text-[1.4em] font-cascadia tracking-[10px]">altus</h1>
        <div>
          {session && (
            <Link href="/dashboard" className="text-black-300 border-[1.5px] border-gray-400 px-4 py-2 hover:bg-[var(--cor-primaria)] hover:text-white hover:border-transparent mr-3 rounded-[5px] transition-all duration-[400ms] ease-in">
              Dashboard
            </Link>
          )}
          {!session && (
            <>
              <ButtonLink text="login" />
              <ButtonLink text="cadastrar" />
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
