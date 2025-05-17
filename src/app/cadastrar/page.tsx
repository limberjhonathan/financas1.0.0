import { Button, Input } from "@/components/form-components";
import { FormLayout } from "@/components/form-layout";
import { TitleForm } from "@/components/form-title";
import { LayoutBackForm } from "@/templates/layoutBack-form";
import Link from "next/link";

export default function Cadastrar() {
    return (
        <LayoutBackForm>
            <div>
                <TitleForm>Cadastre-se</TitleForm>
                <FormLayout>
                    <Input text="Nome do usuário" />
                    <Input text="Email" />
                    <Input text="Senha" />
                    <Input text="Senha" />
                    <Button text="Cadastrar" />
                </FormLayout>
                <p className="text-center p-2">Ja possui conta? <Link href={'/login'} className="text-[var(--form-bg)] font-bold cursor-pointer underline">Faça Login</Link></p>
            </div>
        </LayoutBackForm>
    )
}