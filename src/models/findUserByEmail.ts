import db from "../lib/db";
import { compareSync } from "bcryptjs";

export async function findUserByEmail(email: string) {
  return await db.user.findUnique({ where: { email } });
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

type User = {
  email: string;
  password?: string;
  name?: string;
  isConfirmed: boolean;
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