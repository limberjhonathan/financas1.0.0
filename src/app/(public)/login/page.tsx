
import { TitleForm } from "@/src/components/form-title"
import { LayoutBackForm } from "@/src/templates/layoutBack-form"
import { generatePageMetadata } from "@/src/utils/page-title"
import Link from "next/link"
import LoginForm from "./login-form"
// import { auth } from "@/auth"
// import { redirect } from "next/navigation"

export const metadata = generatePageMetadata("Login", "Login page")

export default async function Login() {
    // const session = await auth()

    // if (session) {
    //     redirect('/dashboard')
    // }

    return (
        <LayoutBackForm>
            <div>
                <TitleForm>Login</TitleForm>
                <LoginForm />
                <p className="text-center p-2">Ainda não possui conta? <Link href={'/cadastrar'} className="text-[var(--form-bg)] font-bold cursor-pointer underline">Cadastre-se</Link></p>
            </div>
        </LayoutBackForm>

    )
}