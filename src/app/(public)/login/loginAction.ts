"use server";

import { signIn } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export default async function loginAction(_prevState: any, formData: FormData) { 
    try {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        console.log("Login attempt with email:", email);
        console.log("Login attempt with password:", password)

        if (!email || !password) {
            return { success: false, message: "Email e senha são obrigatórios" };
        }

        await signIn("credentials", {
            email,
            password,
            redirect: true,
            redirectTo: "/dashboard",
        });
    } 
    catch (e: any) {
        if(isRedirectError(e)) {
            throw e;
        }

        if (e?.type === "CredentialsSignin") {
            return { success: false, message: "Senha ou email inválidos" };
        }
        console.error("Erro ao fazer login:", e);
        return { success: false, message: "Dados de Login inválidos" };
    }
}
