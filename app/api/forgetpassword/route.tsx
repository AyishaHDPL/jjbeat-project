import { forgetPasswordController } from "@/controller/forgetpassword.controller";
import { NextRequest } from "next/server";

export async function POST(req:NextRequest) {
    return forgetPasswordController(req)
}