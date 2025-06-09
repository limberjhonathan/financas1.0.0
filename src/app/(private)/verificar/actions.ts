'use server';
// import getEmailFromToken from "@/src/actions/getEmailToken";
import { findUserByEmail } from "@/src/models/useModel";
import { checkDateNow } from "@/src/services/userServices";

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
