"use server";

import db from "../lib/db";

export async function findUserByEmail(email: string) {
  return await db.user.findUnique({ 
    where: { email },
    include: {
      confirmationCode: true
    } 
  });
}

export async function createUser(data: {
  email: string;
  password: string;
  username: string;
}) {
  
  return await db.user.create({
    data: {
      email: data.email,
      password: data.password,
      username: data.username,
      createdAt: new Date(),
    },
  });
}

export async function updateCodeUser(newCode: string, idExisting: number) {
  return await db.confirmationCode.update({
    where: {
      id: idExisting,
    },
    data: {
      code: newCode,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 3 * 60 * 1000), 
    },
  });
}

export async function checkCode(code: string, email: string) {

  const found = await db.confirmationCode.findFirst({
    where: {
      code,
      user: {
        email,
      },
      expiresAt: {
        gte: new Date(),
      },
    },
  });
  return found;
}

export async function emailValidation(email: string) {
  return  await db.user.update({
    where: { email },
    data: { isConfirmed: true },
  });
}