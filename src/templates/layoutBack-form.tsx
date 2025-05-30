import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

interface LayoutBackFormProps {
  children: ReactNode;
}

export function LayoutBackForm({ children }: LayoutBackFormProps) { 
    return(
        <div className="bg-[var(--background)] min-h-[100dvh] text-white flex flex-col items-center justify-between p-2">
            <div className="flex flex-col items-center gap-3 2xl:gap-8 2xl:mt-20 2xl:text-[1em] text-[.8em] ">
                <Link href={'/'}>
                    <Image src="/background/bg-altus.png" alt="Background Altus" width={150} height={150} />
                </Link>
                {children}
            </div>
            <span className="font-bold text-gray-600 transform lg:scale-75">Desenvolvido por <Link href={'https://www.linkedin.com/in/limber-jhonathan/'} className="underline text-emerald-800">Limber Jhonathan</Link></span>
        </div>
    )
}