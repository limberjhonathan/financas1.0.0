import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "chave_super_secreta";

export function generateEmailToken(email: string) {
  return jwt.sign({ email }, secret, { expiresIn: "1m" });
}
