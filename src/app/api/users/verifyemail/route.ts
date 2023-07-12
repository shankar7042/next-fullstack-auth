import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/db/dbConfig";
import User from "@/models/userModel";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token } = body;

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Token invalid or token expires" },
        { status: 404 }
      );
    }

    if (user.verified) {
      return NextResponse.json({ error: "Already verified" });
    }

    user.verifyToken = null;
    user.verifyTokenExpiry = null;
    user.verified = true;

    await user.save();

    return NextResponse.json({ message: "User verified successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
