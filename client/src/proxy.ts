import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { AUTH_ENDPOINTS } from "@/lib/api/endpoints/auth.endpoints";


type Payload = {
	id: string;
	role: "USER" | "ADMIN" | "MODERATOR" | "OWNER";
};

export async function proxy(request: NextRequest) {
  const res = await adminProxy(request);
	return res ?? NextResponse.next();
}

async function adminProxy(request: NextRequest) {
	try {
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

		const { payload } = await jwtVerify<Payload>(
			accessToken,
			JWT_ACCESS_SECRET,
		);

		if (payload.role === "USER") {
			return NextResponse.redirect(new URL("/forbidden", request.url));
		}
	} catch {

		const cookieStore = await cookies();
		const accessToken = cookieStore.get("access_token")?.value;
		const refreshToken = cookieStore.get("refresh_token")?.value;

		const refreshRes = await fetch(
			`http://26.216.9.84:5000/api${AUTH_ENDPOINTS.refresh}`,
			{
				headers: {
					Cookie: `access_token=${accessToken}; refresh_token=${refreshToken}`,
				},
			},
		);

    const cookie = refreshRes.headers.get("set-cookie");

		if (cookie) {
      // console.log("refresh_token:", cookie.split(";")[0].split("=")[1]);
      cookieStore.set({
        name: "refresh_token",
        value: cookie.split(";")[0].split("=")[1],
        httpOnly: true,
      });
      // console.log("access_token:", cookie.split(";")[2].split("=")[1]);
      cookieStore.set({
        name: "access_token",
        value: cookie.split(";")[2].split("=")[1],
        httpOnly: true,
      });

      return NextResponse.next();
		} else {
      return NextResponse.redirect(new URL("/", request.url));
    }
	}
}

export const config = {
	matcher: ["/admin/:path*"],
};
