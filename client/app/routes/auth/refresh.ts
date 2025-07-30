import { BASE_URL } from "~/services/api";
import { redirect } from "react-router";
import type { Route } from "./+types/refresh";

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const redirectTo = url.searchParams.get("redirect") ?? "/";
  console.log("redirectTo", redirectTo);

  const cookieHeader = request.headers.get("cookie");

  const headers: HeadersInit = {};

  if (cookieHeader) {
    headers["cookie"] = cookieHeader;
  }

  try {
    const response = await fetch(`${BASE_URL}/auth/refresh`, {
      method: "POST",
      headers,
      credentials: "include",
    });

    if (response.status === 400) {
      return redirect("/");
    }

    const newHeaders = new Headers();
    const setCookie = response.headers.get("set-cookie");
    if (setCookie) {
      newHeaders.append("Set-Cookie", setCookie);
    }

    return redirect(redirectTo, { headers: newHeaders });
  } catch (error) {
    console.error("Refresh error:", error);
    throw error;
  }
}
