'use server';
// import getEmailFromToken from "@/src/actions/getEmailToken";
import { findUserByEmail } from "@/src/models/useModel";
import { checkDateNow, codeComparation } from "@/src/services/userServices";

export async function checkCodeAction(email: string): Promise<void>{
  const user = await findUserByEmail(email);

  if (!user) return;

  if (user.confirmationCode?.createdAt && user.confirmationCode?.expiresAt) {
    await checkDateNow(
      user.confirmationCode.id,
      user.confirmationCode.createdAt,
      user.confirmationCode.expiresAt
    );
  }
}

export async function inputCodeVerification(_prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const rawCode = formData.get("code") as string;
  const code = rawCode.replace(/-/g, "");
  if(code && email) {
    await codeComparation(code, email);
  }
}
