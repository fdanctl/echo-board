import { Input } from "~/components/Input";
import type { Route } from "./+types/home";
import { PrimaryBtn } from "~/components/PrimaryBtn";
import { SecundaryBtn } from "~/components/SecundaryBtn";
import { useThemeContext } from "~/context/ThemeContext";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const { theme, changeTheme } = useThemeContext();

  return (
    <>
      <h1 className="font-medium text-3xl text-accent1">Hello</h1>
      <Input type="email" label="Email" id="email" placeholder="Email" required={true} />
      <PrimaryBtn text="primary" />
      <SecundaryBtn text="secundary" />
      <PrimaryBtn text="light" onClick={() => changeTheme("light")} />
      <PrimaryBtn text="dark" onClick={() => changeTheme("dark")} />
      <PrimaryBtn text="system" onClick={() => changeTheme("system")} />
    </>
  );
}
