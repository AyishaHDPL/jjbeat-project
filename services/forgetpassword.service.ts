import { db } from "@/lib/db";

export async function ForgetPasswordService(userName: string): Promise<boolean> {
  const [rows]: any = await db.execute(
    "SELECT 1 FROM user_details WHERE userName = ? LIMIT 1",
    [userName]
  );

  return rows.length > 0;
}
