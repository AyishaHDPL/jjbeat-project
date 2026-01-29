import { resetPasswordService } from "@/services/resetpassword.service";
import { NextRequest, NextResponse } from "next/server";

export async function resetPasswordController(req: NextRequest) {
  try {
    const body = await req.json();
    const { userName, password } = body;
    if (!userName || !password) {
      return NextResponse.json(
        {
          message: "userName and password are required",
          success: false,
        },
        { status: 401 },
      );
    }
    const result = resetPasswordService(userName, password);
    if (!result) {
      return NextResponse.json(
        {
          message: "invalid userName and password",
          success: true,
        },
        { status: 400 },
      );
    }
    return NextResponse.json(
      {
        message: "Password has been reset successfully",
        success: true,
      },
      { status: 200 },
    );
  } catch (error) {
    NextResponse.json(
      {
        message: "Reset password occurred error",
        success: true,
      },
      { status: 500 },
    );
  }
}
