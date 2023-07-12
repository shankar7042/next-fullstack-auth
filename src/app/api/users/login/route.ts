import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/db/dbConfig";
import User from "@/models/userModel";

connectDB();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;
    let user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "User do not exist", success: false },
        { status: 400 }
      );
    }

    const passwordValid = await user.verifyPassword(password);

    if (!passwordValid) {
      return NextResponse.json(
        { error: "Password is incorrect" },
        { status: 400 }
      );
    }

    const token = jwt.sign(
      {
        id: user._id.toString(),
        email: user.email,
        username: user.username,
      },
      process.env.JSONWEBTOKEN_SECRET!
    );

    const response = NextResponse.json(
      { message: "Sign In successfully", user, success: true },
      { status: 201 }
    );

    response.cookies.set("token", token, {
      maxAge: 1000 * 60 * 60 * 24,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 }
    );
  }
}
