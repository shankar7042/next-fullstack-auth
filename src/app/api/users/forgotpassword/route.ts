import { connectDB } from "@/db/dbConfig";
import { sendMail } from "@/helpers/mailer";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await sendMail({
      emailId: email,
      userId: user._id.toString(),
      emailType: "RESET",
    });

    return NextResponse.json({ message: "Mail sent to reset password" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
