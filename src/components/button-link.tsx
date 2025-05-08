import Link from "next/link";

export interface Titulo {
    text: string
}

export function ButtonLink(props: Titulo) {
    return (
        <Link href={`/${props.text}`} className="text-black-300 border-[1.5px] border-gray-400 px-4 py-2 hover:bg-background-button hover:text-white hover:border-transparent mr-3 rounded-[5px] transition-all duration-[400ms] ease-in">
            {props.text}
        </Link>
    )
}