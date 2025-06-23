"use server";

import { compareSync } from "bcryptjs";
import db from "../lib/db";
import { generateCode } from "../utils/generateCode";
import { checkCode, emailValidation, updateCodeUser } from "../models/useModel";

type User = {
    email: string;
    password?: string;
    name?: string;
    isConfirmed: boolean;
}

export async function createExpiringConfirmationCode(code: string, userId: number) {
    await db.confirmationCode.create({
        data: {
            code,
            user: {
                connect: { id: userId }
            },
            expiresAt: new Date(Date.now() + 3 * 60 * 1000),
        },
    });
}

export async function findUserByCredentials(
  email: string,
  password: string
): Promise<User | null> {
  const user = await db.user.findFirst({
    where: {
      email: email,
    },
  });
  if (!user) {
    return null;
  }

  const passwordMatch = compareSync(password, user.password);

  if (passwordMatch) {
    return { email: user.email, name: user.username, isConfirmed: user.isConfirmed };
  }

  return null;
}

export async function checkDateNow(
  id: number,
  createdAt?: Date,
  expiresAt?: Date
){
  if (!createdAt || !expiresAt) {
    return;
  }

  const now = new Date();
  if (expiresAt <= now) {
    const newCode = generateCode();
    return await updateCodeUser(newCode, id);
    
  }
}

export async function codeComparation(code: string, email: string) {
  const found = await checkCode(code, email)
  if (found) {
    await emailValidation(email)
    return null;
  }

  return found;
}

// export default async function createNewCode(email: string){
//   const user = await findUserByEmail(email)

// }