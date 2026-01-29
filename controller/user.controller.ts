import { loginService } from "@/services/user.service";
import { NextRequest, NextResponse } from "next/server";

export async function loginController(req: NextRequest) {
  try {
    const body = await req.json();
    const { userName, password } = body;

    if (!userName || !password) {
      return NextResponse.json(
        { message: "Username and password are required", success: false },
        { status: 400 }
      );
    }
    const result = await loginService(userName, password);
    if (!result) {
      return NextResponse.json(
        { message: "Invalid username or password", success: false },
        { status: 401 }
      );
    }
    return NextResponse.json(
      {
        message: "login Successfully",
        success: true,
        token: result.token,
        user: result.user,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "error occured", success: false },
      { status: 500 }
    );
  }
}
