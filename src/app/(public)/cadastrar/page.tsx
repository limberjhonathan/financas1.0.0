import { Button, Input } from "@/components/form-components";
// import { FormLayout } from "@/components/form-layout";
import Form from 'next/form'

import { TitleForm } from "@/components/form-title";
import { LayoutBackForm } from "@/templates/layoutBack-form";
import Link from "next/link";
import registerAction from "./registerAction";

export default function Cadastrar() {
    return (
        <LayoutBackForm>
            <div>
                <TitleForm>Cadastre-se</TitleForm>
                <Form action={registerAction} className="flex flex-col gap-3 mt-4 w-[350px] 2xl:gap-5 2xl:w-[400px]">
                    <Input text="Nome do usuário" name="name"/>
                    <Input text="Email" type="text" name="email"/>
                    <Input text="Senha" type="password" name="password"/>
                    <Input text="Digite novamente a senha" type="password" name="repeatPassword"/>
                    <Button text="Cadastrar" />
                </Form>
                <p className="text-center p-2">Ja possui conta? <Link href={'/login'} className="text-[var(--form-bg)] font-bold cursor-pointer underline">Faça Login</Link></p>
            </div>
        </LayoutBackForm>
    )
}