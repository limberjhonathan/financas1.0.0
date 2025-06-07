"use server";

import { signIn } from "@/auth";
import { generateEmailToken } from "@/src/utils/generateEmailToken";
// import { sendVerificationEmail } from "@/src/lib/email/sendVerificationEmail";
// import { generateCode } from "@/src/utils/generateCode";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function loginAction(_prevState: any, formData: FormData) {
    try {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

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
        const email = formData.get("email") as string

        // const code = generateCode()

        if (isRedirectError(e)) {
            throw e;
        }
        if (e.code === "UserNotConfirmed") {
            const cookieStore = await cookies();
            cookieStore.set({
                name: "email_not_confirmed",
                value: generateEmailToken(email),
                path: "/",
                maxAge: 60 * 3,
                httpOnly: true,
                sameSite: "lax",
                secure: process.env.NODE_ENV === "production",
            });
            // Enviar o email
            // await sendVerificationEmail(email, code);

            redirect("/verificar");
        }

        if (e?.type === "CredentialsSignin") {
            return { success: false, message: "Senha ou email inválidos" };
        }

        return { success: false, message: "Dados de Login inválidos" };
    }
}
