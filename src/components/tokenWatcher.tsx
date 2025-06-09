"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function TokenWatcher() {
    const router = useRouter();
    
    useEffect(() => {
        console.log("Olha o TokenWatcher rodando");
        const interval = setInterval(() => {
            router.refresh();
        }, 100000); // 100000 ms = 100 seconds

        return () => clearInterval(interval);
    }, [router]);
    return null
}
