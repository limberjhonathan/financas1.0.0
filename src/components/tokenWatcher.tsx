"use client";
import { useEffect } from "react";

interface Exp {
    exp: number;
}

export default function TokenWatcher({ exp }: Exp) {
    useEffect(() => {
        const now = Date.now();
        const expMs = exp * 1000; // Convertendo exp de segundos para ms
        const delay = expMs - now; // Tempo restante até expirar
        // console.log("Delay (minutos):", delay / 1000 / 60);
        
        const timeout = setTimeout(() => {
            localStorage.removeItem("verificarAtivo");
            window.location.reload();
        }, delay);

        return () => clearTimeout(timeout);
    }, [exp]);

    return null;
}
