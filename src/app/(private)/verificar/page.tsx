import getEmailFromToken from "@/src/actions/getEmailToken";
import CheckCodeForm from "./form-checkCode";

export default async function CheckCode() {
  const email = await getEmailFromToken();
  return (
    <>
      <CheckCodeForm email={email}/>
    </>
  );
}
