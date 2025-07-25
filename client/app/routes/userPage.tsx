import { Input } from "~/components/Input";
import type { Route } from "./+types/userPage";
import { UserHero } from "~/components/UserHero";
import { CartToast } from "~/components/CartToast";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader() {}

export default function UploadTrack({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <UserHero />
      <CartToast />
    </>
  );
}
