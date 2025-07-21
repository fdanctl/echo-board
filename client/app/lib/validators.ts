import { parse } from "cookie";
import jwt from "jsonwebtoken";
import type { JwtPayloadCustom } from "~/types/auth";

export function verifyCookie (request: Request) {
  const cookieHeader = request.headers.get("Cookie");
  const cookies = parse(cookieHeader || "");
  const token = cookies.accessToken;

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string
    ) as JwtPayloadCustom;
    return decoded;
  } catch {
    return null;
  }
}
