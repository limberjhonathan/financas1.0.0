export interface Text {
    text?: string;
}

export function Input(props: Text) {
    return (
        <input
            type="text"
            placeholder={props.text}
            className="
                w-full
                2xl:h-13
                2xl:px-3
                2xl:py-4
                h-9
                px-3
                text-[1em]
                xl:text-[.9em]
                border-2 border-[var(--form-bg)]
                rounded-md
                font-sans
                font-bold
                leading-[3rem]
                focus:outline-none
                focus:ring-2 focus:ring-[var(--form-bg)]
                focus:shadow-[0_0_20px_var(--cor-primaria)]
                transition-shadow duration-700"
        />
    )
}

export function Button(props: Text) {
    return (
        <button className="w-full h-9 2xl:h-13 bg-[var(--form-bg)] rounded-md text-[var(--background))] font-sans font-bold first-letter:uppercase hover:bg-[#1f605a] transition-bg duration-800">{props.text}</button>
    )
}