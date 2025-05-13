import Link from "next/link";
import Image from "next/image";
import { ButtonLink } from "@/components/button-link";

export function Hero() {
  return (
    <header>
      <nav className="flex justify-between items-center px-[3em] py-[1em] shadow-lg">
        <Link href="/" className="w-[100px] h-[60px]">
          <Image className="h-full w-full object-contain" src="/logo/logo.png" alt="Logo" width={100} height={100} priority/>
        </Link>
        <h1 className="uppercase text-[1.4em] font-cascadia tracking-[10px]">altus</h1>
        <div>
          <ButtonLink text="login" />
          <ButtonLink text="cadastrar" />
        </div>
      </nav>
    </header>
  );
}
