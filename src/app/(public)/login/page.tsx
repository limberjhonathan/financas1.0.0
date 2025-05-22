import { Input, Button } from "@/components/form-components"
import { FormLayout } from "@/components/form-layout"
import { TitleForm } from "@/components/form-title"
import { LayoutBackForm } from "@/templates/layoutBack-form"
import { generatePageMetadata } from "@/utils/page-title"
import Link from "next/link"

export const metadata = generatePageMetadata("Login", "Login page")

export default function Login() {

    return (
        <LayoutBackForm>
            <div>
                <TitleForm>Login</TitleForm>
                <FormLayout>
                    <Input text="E-mail ou usuário" type="text"/>
                    <Input text="Senha" type="password"/>
                    <Button text="acessar" />
                </FormLayout>
                <p className="text-center p-2">Ainda não possui conta? <Link href={'/cadastrar'} className="text-[var(--form-bg)] font-bold cursor-pointer underline">Cadastre-se</Link></p>
            </div>
        </LayoutBackForm>

    )
}