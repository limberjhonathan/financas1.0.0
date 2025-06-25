import { buttonClass } from "@/src/utils/style/buttonStyle";
import { IoClose } from "react-icons/io5";

interface LayoutEmailProps {
    onClose: () => void;
}

export function LayoutEmail(props: LayoutEmailProps) {
    return (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.8)] flex items-center justify-center z-50">
            <IoClose onClick={props.onClose} className="text-4xl absolute top-10 left-10 cursor-pointer" />
            <div className="bg-white text-black p-6 rounded-lg shadow-lg w-120">
                <h1 className="text-xl font-semibold mb-4">Atualização do email</h1>
                <div className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Digite o seu novo email"
                        name="checkCode"
                        className="border border-gray-500 p-3 rounded w-full focus:outline-none"
                    />
                    <button className={buttonClass}>
                        Enviar
                    </button>
                </div>
            </div>
        </div>
    );
}
