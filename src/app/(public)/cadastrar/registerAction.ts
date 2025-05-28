'use server'

import db from "@/lib/db";
// import { hashSync } from "bcrypt-ts";
import validator from 'validator';

export default async function registerAction(
  _prevState: unknown,
  formData: FormData
) {
  const data = Object.fromEntries(formData.entries()) as {
    email: string;
    password: string;
    repeatPassword: string;
    name: string;
  };

  const allFieldsFilled = data.name && data.email && data.password && data.repeatPassword;
  const isEmailValid = validator.isEmail(data.email);
  const arePasswordsLongEnough = data.password.length >= 6 && data.repeatPassword.length >= 6;
  const passwordsMatch = data.password === data.repeatPassword;
  const userExists = await db.user.findUnique({ where: { email: data.email } });

  const validations = [
    {
      valid: allFieldsFilled,
      message: "Campos obrigatórios não preenchidos",
      typeError: "all",
    },
    {
      valid: isEmailValid,
      message: "E-mail inválido",
      typeError: "notEmail",
    },
    {
      valid: !userExists,
      message: "Usuário já cadastrado",
      typeError: "userExists",
    },
    {
      valid: arePasswordsLongEnough,
      message: "A senha deve ter no mínimo 6 caracteres",
      typeError: "shortPassword",
    },
    {
      valid: passwordsMatch,
      message: "As senhas não coincidem",
      typeError: "passwordsDontMatch",
    },
  ];

  for (const { valid, message, typeError } of validations) {
    if (!valid) {
      return { message, error: false, typeError };
    }
  }

  // Criação do usuário no banco (descomente quando for usar)
  // await db.user.create({
  //   data: {
  //     email: data.email,
  //     password: hashSync(data.password),
  //     username: data.name,
  //     createdAt: new Date(),
  //   },
  // });

  return {
    message: "Usuário cadastrado com sucesso",
    error: true,
    typeError: "createdSuccess",
  };
}
