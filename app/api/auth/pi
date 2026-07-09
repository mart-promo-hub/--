import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { accessToken } = await request.json();

    if (!accessToken) {
      return NextResponse.json(
        { error: "Missing access token" },
        { status: 400 }
      );
    }

    const piResponse = await fetch("https://api.minepi.com/v2/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!piResponse.ok) {
      return NextResponse.json(
        { error: "Invalid Pi access token" },
        { status: 401 }
      );
    }

    const piUser = await piResponse.json();

    return NextResponse.json({
      success: true,
      user: {
        uid: piUser.uid,
        username: piUser.username,
      },
    });
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
