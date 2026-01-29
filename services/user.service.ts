import { db } from "@/lib/db";
import { signToken } from "@/lib/jwt";
import bcrypt from "bcrypt";

export async function loginService(userName: string, password: string) {
  const [rows]: any = await db.execute(
    "SELECT user_id, userName, password, role from user_details where userName=?",
    [userName]
  );
  if (rows.length === 0) {
    return null;
  }
  const user = rows[0];

  const isMatched = await bcrypt.compare(password, user.password);
  if (!isMatched) {
    return null;
  }
  const token = signToken({
    user_id: user.user_id,
    userName: user.userName,
    role: user.role,
  });

  return {
    token,
    user: {
      user_id: user.user_id,
      userName: user.userName,
      role: user.role,
    },
  };
}
