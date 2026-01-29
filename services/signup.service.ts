import { db } from "@/lib/db";
import bcrypt from "bcrypt";

export async function signupService(userName:string, role:string, password:string) {
    const [rows]:any = await db.execute(
        "SELECT USER_ID FROM user_details WHERE userName = ? LIMIT 1" , [userName]
    )
    if(rows.length > 0) {
    throw new Error("user existing")
    }
    const hashedPassword = await bcrypt.hash(password,10);
    await db.execute(
        "INSERT INTO user_details (userName,role,password) VALUES (?,?,?)",
        [userName, role,hashedPassword]
    )
    return true
}