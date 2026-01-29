import { signupController } from "@/controller/signup.controller";
import { NextRequest } from "next/server";

 export async function POST(req:NextRequest) {
  return signupController(req);
 }