"use server";

import {cookies} from "next/headers";

export async function isAuth () {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;

  return !!token;
}

export async function clearAuthCookies () {
  const cookieStore = await cookies();
  // cookieStore.delete('access_token');
  // cookieStore.delete('refresh_token');
}