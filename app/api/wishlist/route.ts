import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

import { connectDB } from "@/lib/mongodb";
import wishlist from "@/models/wishlist";

export async function GET() {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as { id: string };
const wishlistItems = await wishlist.find({
  userId: decoded.id,
});

return NextResponse.json(wishlistItems);

 } catch (error) {
  console.error(error);

  return NextResponse.json(
    {
      message: "Something went wrong.",
      error: String(error),
    },
    { status: 500 }
  );
}
}

export async function POST(request: Request) {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as { id: string };

    const { productId } = await request.json();

    const exists = await wishlist.findOne({
      userId: decoded.id,
      productId,
    });

    if (exists) {
      return NextResponse.json(
        { message: "Already in wishlist." },
        { status: 409 }
      );
    }

    const wishlistItem = await wishlist.create({
      userId: decoded.id,
      productId,
    });

    return NextResponse.json(wishlistItem, {
      status: 201,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as { id: string };

    const { productId } = await request.json();

    await wishlist.findOneAndDelete({
      userId: decoded.id,
      productId,
    });

    return NextResponse.json({
      message: "Removed from wishlist.",
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}