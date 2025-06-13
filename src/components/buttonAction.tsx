import { buttonClass } from "../utils/style/buttonStyle";

interface ButtonActionProps {
    text: string;
    disabled?: boolean;
    onClick?: () => void;
    baseClass?: string;
    type?: "button" | "submit" | "reset";
}

export default function ButtonAction(props: ButtonActionProps) {
    const disabledStyle = props.disabled ? "opacity-50 cursor-not-allowed" : ""
    return (
        <button
            type={props.type}
            disabled={props.disabled}
            onClick={props.onClick}
            className={`${buttonClass} ${props.baseClass ?? ""} ${disabledStyle} ${disabledStyle}`}
        >
            {props.text}
        </button>
    )
}