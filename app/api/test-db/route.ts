import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {

  console.log(process.env.MONGODB_URI);

  try {
    await connectDB();

    return NextResponse.json({
      message: "Database connected successfully",
    });

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Database connection failed",
      },
      {
        status: 500,
      }
    );
  }
}