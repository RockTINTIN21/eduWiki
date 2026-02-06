import { jwtVerify } from "jose";
import { type NextRequest, NextResponse } from "next/server";

type Payload = {
	id: string;
	role: "USER" | "ADMIN" | "MODERATOR" | "OWNER";
};

export async function middleware(request: NextRequest) {
	console.log("hey");
	const res = await adminMiddleware(request);
	return res ?? NextResponse.next();
}

async function adminMiddleware(request: NextRequest) {
  try{
    const JWT_ACCESS_SECRET = new TextEncoder().encode(
      process.env.JWT_ACCESS_SECRET,
    );

    if (!JWT_ACCESS_SECRET) {
      throw new Error("JWT_ACCESS_SECRET DOES NOT EXISTS");
    }

    const accessToken = request.cookies.get("access_token")?.value;

    if (!accessToken) {
      throw new Error("ACCESS_TOKEN DOES NOT EXISTS");
    }

    const { payload } = await jwtVerify<Payload>(accessToken, JWT_ACCESS_SECRET);

    if (payload.role === "USER") {
      return NextResponse.redirect(new URL("/forbidden", request.url));
    }
  }catch  {
    return NextResponse.redirect(new URL("/forbidden", request.url));
  }







}

export const config = {
	matcher: ["/admin/:path*"],
};
