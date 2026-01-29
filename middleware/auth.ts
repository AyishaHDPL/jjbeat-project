import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";


export function authMiddleWare (req:NextRequest) {
    const authHeader = req.headers.get("Authorization");
    if(!authHeader || !authHeader.startsWith("bearer")) {
     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
        const token = authHeader.split(" ")[1];
        try {
            const user = verifyToken(token);
            req.headers.set("user", JSON.stringify(user));
            return NextResponse.next();
        }
        catch(error) {
            return NextResponse.json({message:"Invalid or expired token"}, {status:401})
        }
    
}