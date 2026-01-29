
import { ForgetPasswordService } from "@/services/forgetpassword.service";
import { NextRequest, NextResponse } from "next/server";

export async function forgetPasswordController(req: NextRequest) {
  try {
    const body = await req.json();
    const { userName } = body;

    if (!userName) {
      return NextResponse.json(
        { message: "userName is required", success: false },
        { status: 400 }
      );
    }

    const isUserAvailable = await ForgetPasswordService(userName);

    if (!isUserAvailable) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "UserName is available", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error occurred", success: false },
      { status: 500 }
    );
  }
}
