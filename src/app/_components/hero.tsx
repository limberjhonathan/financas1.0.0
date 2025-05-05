import Link from "next/link";
import Image from "next/image";

export function Hero() {
  return (
    <main>
      <header>
        <nav>
          <ul>
            <li>
              <Link href="/">
                <Image src="/logo/logo.png" alt="Logo" width={100} height={100} />
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </main>
  );
}
