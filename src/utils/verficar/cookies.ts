// Import cookieStore from 'next/headers'
"use server"
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function deleteEmailNotConfirmedCookie() {
    const cookieStore = await cookies();
    await cookieStore.delete("email_not_confirmed");
    redirect("/login")
}
