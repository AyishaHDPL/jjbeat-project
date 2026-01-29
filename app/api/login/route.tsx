import { loginController } from "@/controller/user.controller";
import { NextRequest } from "next/server";

export async function POST(req:NextRequest) {
return loginController(req)
}