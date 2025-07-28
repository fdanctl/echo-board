import { Input } from "~/components/Input";
import type { Route } from "./+types/userPage";
import { UserHero } from "~/components/UserHero";
import { CartToast } from "~/components/CartToast";
import { verifyCookie } from "~/lib/validators";
import { redirect } from "react-router";
import { getUserInfo } from "~/services/user";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({ params, request }: Route.LoaderArgs) {
  const url = new URL(request.url);

  const cookieHeader = request.headers.get("cookie");

  let decoded;
  if (cookieHeader) {
    decoded = verifyCookie(request);
  }
  console.log("decoded", decoded);
  if (cookieHeader && !decoded) {
    return redirect(`/api/auth/refresh?redirect=${url.href}`);
  }

  const producer = await getUserInfo(params.username);
  console.log(producer);
  return {
    producer,
  };
}

export default function UploadTrack({ loaderData }: Route.ComponentProps) {
  const producer = loaderData.producer;
  return (
    <>
      <UserHero
        name={producer.name}
        location={producer.location}
        followers={producer.followers}
        tracksN={producer.tracksN}
        plays={producer.plays}
      />
      <CartToast />
    </>
  );
}
