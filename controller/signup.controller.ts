import { signupService } from "@/services/signup.service";
import { NextRequest, NextResponse } from "next/server";

export async function signupController(req:NextRequest) {
    try {
        const body = await req.json();
        const {userName , role, password, conformPassword} = body;
        if(!userName || !role || !password || !conformPassword) {
            return NextResponse.json(
                {message:"Username, role and password are required",success:false }, {status:400}
            );
        }
        if (password !== conformPassword) {
            return NextResponse.json(
                {message: "password and conform password does not match", success:false}, {status:401}
            )
        }
         const result = await signupService(userName, role, password);
         if(!result) {
            return NextResponse.json(
                {message:"Invalid username or password or role", success:false}, {status:401}
            )
         }
         return NextResponse.json(
            {message: "signed up successfully",
                success:true,
            },
            {status:200}
         )
    } catch(error) {
        return NextResponse.json(
            {message:"error occured" , success:false}, {status:500}
        )
    }
}