import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json(null);
  }

  try {
    const user = jwt.verify(
      token,
      process.env.JWT_SECRET!
    );

    return NextResponse.json(user);

  } catch {
    return NextResponse.json(null);
  }
}