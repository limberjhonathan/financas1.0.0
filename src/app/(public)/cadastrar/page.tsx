
import Link from "next/link";

import RegisterForm from "./register-form";
import { LayoutBackForm } from "@/src/templates/layoutBack-form";
import { TitleForm } from "@/src/components/form-title";

export default async function Cadastrar() {

    return (
        <LayoutBackForm>
            <div>
                <TitleForm>Cadastre-se</TitleForm>
                <RegisterForm />
                <p className="text-center p-2">Ja possui conta? <Link href={'/login'} className="text-[var(--form-bg)] font-bold cursor-pointer underline">Faça Login</Link></p>
            </div>
        </LayoutBackForm>
    )
}