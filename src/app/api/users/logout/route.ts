import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const response = NextResponse.json({
    message: "Logged Out successfully",
  });

  response.cookies.delete("token");

  return response;
}
