"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export default async function getEmailFromToken() {
    const co = await cookies();
    const token = co.get("email_not_confirmed")?.value;
    if (!token) return;

    const payload = jwt.decode(token);

    if (typeof payload !== "object" || payload === null) return;

    const email = "email" in payload ? payload.email : "";
    const exp = "exp" in payload ? payload.exp : null;

    return { email, exp };
}
