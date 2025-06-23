"use client";

import { formatTime } from "@/src/utils/formatTime";
import { checkCodeAction, inputCodeVerification } from "./actions";
import { useCooldown } from "@/src/hook/useCooldown";
import ButtonAction from "@/src/components/buttonAction";
import { Input } from "@/src/components/form-components";
import formatCode from "@/src/utils/formatterCode";
import { useActionState, useEffect } from "react";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import TokenWatcher from "@/src/components/tokenWatcher";
import { deleteEmailNotConfirmedCookie } from "@/src/utils/verficar/cookies";

interface Email {
  email: string
  exp: number
}

export default function CheckCodeForm(props: Email) {
  const { disabled, secondsLeft, startCooldown } = useCooldown(() => checkCodeAction(props.email));
  const [state, checkCode, isPending] = useActionState(inputCodeVerification, null)

  useEffect(() => {
    localStorage.setItem("verificarAtivo", "true");
  }, []);

  const handleDeleteCookie = async () => {
    localStorage.removeItem("verificarAtivo"); // CLIENTE
    await deleteEmailNotConfirmedCookie();     // SERVIDOR
    window.location.reload()
  };

  return (
    <section className="bg-[var(--background)] min-h-[100dvh] text-white flex flex-col items-center justify-center">
      <TokenWatcher exp={props.exp} />
      <div className="w-full max-w-lg p-6 relative">
        <div className="absolute top-0 -mt-15">
          <IoIosArrowDropleftCircle size={40} className="text-white cursor-pointer" onClick={handleDeleteCookie} />
        </div>
        <h1 className="mb-4 text-[20px]">
          Avise-nos se esse email pertence a você. Insira o código enviado para: <strong>{props.email}</strong>
        </h1>
        <form action={checkCode} className="w-full flex flex-col gap-4 mb-4">
          <input type="hidden" name="email" value={props.email} />
          <div className="flex justify-center">
            <label htmlFor="code" className="w-25">
              <Input
                name="code"
                baseClass="w-full md:px-3 text-center"
                text="000-000"
                maxLength={7}
                onChange={formatCode}
              />
            </label>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <ButtonAction
              text={isPending ? "Verificando..." : "Continuar"}
              baseClass="w-full md:flex-1"
              type="submit"
            />
            <ButtonAction
              disabled={disabled}
              text={disabled ? `Aguarde ${formatTime(secondsLeft)}` : "Enviar código novamente"}
              onClick={startCooldown}
              baseClass="w-full md:flex-1"
              type="button"
            />
          </div>
          <div className="flex flex-col gap-3">
            <ButtonAction text="Atualizar informações de contato" onClick={() => { }} />
          </div>
        </form>
      </div>
    </section>
  );
}
