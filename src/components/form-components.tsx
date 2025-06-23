"use client"
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useState } from 'react'
import { buttonClass } from '../utils/style/buttonStyle';
import { getSession } from 'next-auth/react';

interface InputText {
    text?: string;
    type?: string;
    name?: string;
    error?: boolean;
    maxLength?: number;
    baseClass?: string;
    onChange?: (value: string) => string;
}
interface ButtonText {
    text?: string;
}

export function Input(props: InputText) {
    const [showPassword, setShowPassword] = useState(false)
    const isPassword = props.type === 'password'
    const [value, setValue] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        let formatted = inputValue;

        if (props.onChange) {
            formatted = props.onChange(inputValue);
        }

        setValue(formatted);
    };

    return (
        <div className='relative w-full'>
            <input
                type={isPassword && !showPassword ? 'password' : 'text'}
                name={props.name}
                placeholder={props.text}
                autoComplete='off'
                value={value}
                maxLength={props.maxLength}
                onChange={handleChange}
                className={`
                    ${props.baseClass ?? "w-full 2xl:pr-9 pr-9"}
                    2xl:h-13
                    2xl:pl-3
                    2xl:py-4
                    h-12
                    pl-3
                    text-[1em]
                    xl:text-[.9em]
                    border-2
                    rounded-md
                    font-sans
                    font-bold
                    focus:outline-none
                    transition-shadow duration-700
                    ${props.error
                        ? 'border-red-500 focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:shadow-[0_0_20px_var(--cor-error)]'
                        : 'border-[var(--form-bg)] focus:ring-2 focus:ring-[var(--form-bg)] focus:shadow-[0_0_20px_var(--cor-primaria)]'}
                `}
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
    const handleClick = async () => {
        const verificarAtivo = localStorage.getItem("verificarAtivo");
        const session = await getSession();
        if (verificarAtivo === "true") {
            window.location.reload();
        }
        if (session) {
            window.location.reload();
        }
    };

    return (
        <button className={buttonClass} onClick={handleClick}>
            {props.text}
        </button>
    );
}