
import { resetPasswordController } from "@/controller/resetpassword.controller";
import { NextRequest } from "next/server";

export async function POST(req:NextRequest) {
    return resetPasswordController(req)
}