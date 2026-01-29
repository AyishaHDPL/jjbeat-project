
import { db } from "@/lib/db";
import bcrypt from "bcrypt";

export async function resetPasswordService(userName: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const [result]: any = await db.execute(
     "UPDATE user_details SET password = ? WHERE userName = ?",
    [hashedPassword,userName],
  );
  if (result.row === 0) {
    return null;
  }
  return true;
}
