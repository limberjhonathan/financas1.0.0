"use client";

import { formatTime } from "@/src/utils/formatTime";
import { checkCodeAction } from "./actions";
import { useCooldown } from "@/src/hook/useCooldown";
import TokenWatcher from "@/src/components/tokenWatcher";

type Props = {
  email: string;
  exp: number;
};

export default function CheckCodeForm({ email, exp }: Props) {
  const { disabled, secondsLeft, startCooldown } = useCooldown(() => checkCodeAction(email));

  return (
    <section className="p-8 max-w-md mx-auto font-sans">
      <TokenWatcher exp={exp}/>
      <p className="mb-4">
        Avise-nos se esse email pertence a você. Insira o código enviado para: <strong>{email}</strong>
      </p>

      {/* input code */}
      <form className="mb-4">
        <label htmlFor="code" className="block mb-2 text-sm font-medium text-gray-700">
          Código de verificação
        </label>
        <input
          type="text"
          id="code"
          name="code"
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Insira o código"
        />
      </form>

      {/* resend code */}
      <div className="flex flex-col gap-3">
        <button
          onClick={startCooldown}
          type="button"
          disabled={disabled}
          className="p-3 bg-blue-600 text-white rounded-md font-bold hover:bg-blue-700 transition disabled:opacity-50"
        >
          {disabled ? `Aguarde ${formatTime(secondsLeft)}` : "Enviar código novamente"}
        </button>
      </div>

      {/* submit buttons */}
      <div className="flex flex-col gap-3 mt-3">
        <button type="submit" className="p-3 bg-blue-600 text-white rounded-md font-bold hover:bg-blue-700 transition">
          Atualizar informações de contato
        </button>

        <button type="submit" className="p-3 bg-blue-600 text-white rounded-md font-bold hover:bg-blue-700 transition">
          Continuar
        </button>
      </div>
    </section>
  );
}
