"use client";

import { Button, Input } from "@/src/components/form-components";
import loginAction from "./loginAction";
import { useActionState } from "react";
import Notification from "@/src/components/notification";
import { useNotification } from "@/src/hook/useNotification";
import FormContainer from "@/src/components/FormContainer";

export default function LoginForm() {

  const [state, formAction, isPending] = useActionState(loginAction, null);
   const { showNotification } = useNotification(state ?? { message: "" });

  const hasError = state?.success === false;

  return (
    <>
      {showNotification && (
        <Notification message={state?.message} error={state?.success} />
      )}
      <FormContainer form={formAction}>
        <Input text="E-mail ou usuário" type="text" name="email" error={hasError} />
        <Input text="Senha" type="password" name="password" error={hasError} />
        <Button text={isPending ? "Acessando" : "acessar"} />
      </FormContainer>
    </>
  );
}
