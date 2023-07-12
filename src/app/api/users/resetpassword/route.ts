import { connectDB } from "@/db/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { forgotPasswordToken, password: newPassword } = body;

    const user = await User.findOne({
      forgotPasswordToken,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Token invalid or token expires" },
        { status: 404 }
      );
    }

    user.forgotPasswordToken = null;
    user.forgotPasswordTokenExpiry = null;
    user.password = newPassword;

    await user.save();

    return NextResponse.json({ message: "Password reset Successfull" });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
