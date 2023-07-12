import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/db/dbConfig";
import User from "@/models/userModel";
import { sendMail } from "@/helpers/mailer";

connectDB();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, username, password } = body;
    let user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "User already exists", success: false },
        { status: 400 }
      );
    }

    user = new User({
      email,
      username,
      password,
    });

    await user.save();
    await sendMail({
      emailId: email,
      userId: user._id.toString(),
      emailType: "VERIFY",
    });

    return NextResponse.json(
      { message: "User created successfully", user, success: true },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 }
    );
  }
}
