import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/db/dbConfig";
import User from "@/models/userModel";

connectDB();

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodedToken: any = jwt.verify(
      token,
      process.env.JSONWEBTOKEN_SECRET!
    );

    const user = await User.findById(decodedToken.id, {
      _id: 0,
      username: 1,
      email: 1,
      verified: 1,
      admin: 1,
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ user });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
