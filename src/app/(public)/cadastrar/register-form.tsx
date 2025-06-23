"use client";
import registerAction from "./registerAction";
import { useActionState } from "react";
import { useNotification } from '@/src/hook/useNotification';
import { getErrorFields } from '@/src/utils/form-error.ts';
import Notification from '@/src/components/notification';
import { Button, Input } from '@/src/components/form-components';
import FormContainer from '@/src/components/FormContainer';

export default function RegisterForm() {
    const [state, formAction, isPending] = useActionState(registerAction, null);
    const { showNotification } = useNotification(state);

    const errorFields = getErrorFields(state?.typeError);
    return (
        <>
            {showNotification && (
                <Notification message={state?.message} error={state?.error} />
            )}
            <FormContainer form={formAction}>
                <Input text="Nome do usuário" name="name" error={errorFields.name} />
                <Input text="Email" type="text" name="email" error={errorFields.email} />
                <Input text="Senha" type="password" name="password" error={errorFields.password} />
                <Input text="Digite novamente a senha" type="password" name="repeatPassword" error={errorFields.repeatPassword} />
                <Button text={isPending ? "Cadastrando..." : "Cadastrar"} />
            </FormContainer>
        </>
    );
}
