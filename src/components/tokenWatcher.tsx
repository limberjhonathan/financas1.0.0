"use client";
import { useEffect } from "react";

export interface Exp {
    exp: number;
}

export default function TokenWatcher({ exp }: Exp) {
    // const expe = exp
    // console.log("Token expira em:", new Date(expe * 1000).toLocaleString());
    useEffect(() => {
        const now = Date.now();
        const expMs = exp * 1000; // Convertendo exp de segundos para ms
        const delay = expMs - now; // Tempo restante até expirar
        console.log("Delay (ms):", delay);
        
        const timeout = setTimeout(() => {
            window.location.reload();
        }, delay);

        return () => clearTimeout(timeout);
    }, [exp]);

    return null;
}
