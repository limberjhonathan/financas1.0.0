import getEmailFromToken from "@/src/actions/getEmailToken";
import CheckCodeForm from "./form-checkCode";

export default async function CheckCode() {
  const token = await getEmailFromToken();
  return (
    <>
      <CheckCodeForm email={token?.email ?? ""} exp={token?.exp ?? 0}/>
    </>
  );
}
