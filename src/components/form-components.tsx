"use client"
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useState } from 'react'

export interface InputText {
    text?: string;
    type?: string;
}
export interface ButtonText {
    text?: string;
}

export function Input(props: InputText) {
    const [showPassword, setShowPassword] = useState(false)
    const isPassword = props.type === 'password'

    return (
        <div className='relative w-full'>
            <input
                type={isPassword && !showPassword ? 'password' : 'text'}
                placeholder={props.text}
                className="
            w-full
            2xl:h-13
            2xl:pl-3
            2xl:pr-9
            2xl:py-4
            h-12
            pl-3
            pr-9
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
            {isPassword && (
                <div
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600 2xl:text-[1.3em] text-[1.5em]"
                >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                </div>
            )}

        </div>
    )
}

export function Button(props: ButtonText) {
    return (
        <button className="w-full h-12 2xl:h-13 bg-[var(--form-bg)] rounded-md text-[var(--background))] font-sans font-bold first-letter:uppercase hover:bg-[#1f605a] transition-bg duration-800">{props.text}</button>
    )
}