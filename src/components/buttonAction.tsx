import { buttonClass } from "../utils/style/buttonStyle";

interface ButtonActionProps {
    text: string;
    disabled?: boolean;
    onClick: () => void;
    baseClass?: string;
}

export default function ButtonAction(props: ButtonActionProps) {
    return (
        <button
            disabled={props.disabled}
            onClick={props.onClick}
            className={`${buttonClass} ${props.baseClass ?? ""}`}
        >
            {props.text}
        </button>
    )
}