import validator from 'validator';

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
}

export function validateRegisterInput(data: RegisterData, userExists: boolean) {
  const validations = [
    {
      valid: !!(data.name && data.email && data.password && data.repeatPassword),
      message: "Campos obrigatórios não preenchidos",
      typeError: "all",
    },
    {
      valid: validator.isEmail(data.email),
      message: "E-mail inválido",
      typeError: "notEmail",
    },
    {
      valid: !userExists,
      message: "Usuário já cadastrado",
      typeError: "userExists",
    },
    {
      valid: data.password.length >= 6 && data.repeatPassword.length >= 6,
      message: "A senha deve ter no mínimo 6 caracteres",
      typeError: "shortPassword",
    },
    {
      valid: data.password === data.repeatPassword,
      message: "As senhas não coincidem",
      typeError: "passwordsDontMatch",
    },
  ];

  for (const { valid, message, typeError } of validations) {
    if (!valid) {
      return { message, error: false, typeError };
    }
  }

  return null; // Tudo certo
}
