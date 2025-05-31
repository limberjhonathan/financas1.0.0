'use server'

import { validateRegisterInput } from "@/src/lib/validators/validateRegister";
import { createUser, findUserByEmail } from "@/src/models/findUserByEmail";
import { hashSync } from "bcryptjs";
import { redirect } from "next/navigation";


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

  const userExists = await findUserByEmail(data.email);

  const validationError = validateRegisterInput(data, !!userExists);
  if (validationError) {
    return validationError;
  }

  await createUser({
    email: data.email,
    password: hashSync(data.password),
    username: data.name,
  });

  return redirect("/login");
}
