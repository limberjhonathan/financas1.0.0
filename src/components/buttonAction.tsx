import { useEffect, useState } from "react";
import { buttonClass } from "../utils/style/buttonStyle";

interface ButtonActionProps {
  text: string;
  disabled?: boolean;
  onClick?: () => void;
  baseClass?: string;
  type?: "button" | "submit" | "reset";
}

export default function ButtonAction(props: ButtonActionProps) {
  const [hasVerified, setHasVerified] = useState(false);

  useEffect(() => {
    const verified = localStorage.getItem("verificarAtivo");
    setHasVerified(!!verified);
  }, []);

  const disabledStyle = props.disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button
      type={props.type}
      disabled={props.disabled}
      onClick={() => {
        if (hasVerified) {
          window.location.reload();
        } else {
          props.onClick?.();
        }
      }}
      className={`${buttonClass} ${props.baseClass ?? ""} ${disabledStyle}`}
    >
      {props.text}
    </button>
  );
}
