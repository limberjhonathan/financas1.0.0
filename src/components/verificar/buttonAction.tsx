import { buttonClass } from "../../utils/style/buttonStyle";

interface ButtonActionProps {
  text: string;
  disabled?: boolean;
  onClick?: () => void;
  baseClass?: string;
  type?: "button" | "submit" | "reset";
}

export default function ButtonAction(props: ButtonActionProps) {
  const disabledStyle = props.disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button
      type={props.type}
      disabled={props.disabled}
      onClick={() => {
        if (typeof window !== "undefined") {
          const hasVerified = localStorage.getItem("verificarAtivo");
          if (hasVerified) {
            props.onClick?.();
            return;
          }
        }
        window.location.reload();
      }}
      className={`${buttonClass} ${props.baseClass ?? ""} ${disabledStyle}`}
    >
      {props.text}
    </button>
  );
}
