import Link from "next/link";
import Image from "next/image";

export function Hero() {
  return (
    <main>
      <header>
        <nav className="flex justify-between items-center px-8 shadow-lg">
          <Link href="/">
            <Image src="/logo/logo.png" alt="Logo" width={100} height={100} />
          </Link>
          <h1 className="first-letter:capitalize text-[2em]">altus</h1>
          <div>
            <Link href={"/login"} className="px-4 py-2 bg-slate-400 mr-3 rounded-[5px]">login</Link>
            <Link href={"/"} className="px-4 py-2 bg-slate-400 rounded-[5px]">registrar</Link>
          </div>
        </nav>
      </header>
    </main>
  );
}
