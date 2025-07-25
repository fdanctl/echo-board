import { Input } from "~/components/Input";
import type { Route } from "./+types/home";
import { PrimaryBtn } from "~/components/PrimaryBtn";
import { SecundaryBtn } from "~/components/SecundaryBtn";
import { useThemeContext } from "~/context/ThemeContext";
import { SearchInput } from "~/components/SearchInput";
import { FileInput } from "~/components/FileInput";
import { DropdownWithSearch } from "~/components/DropdownWithSearch";
import { SelectInput } from "~/components/SelectInput";
import { Navbar } from "~/components/Navbar";
import { refresh } from "~/services/auth";
import { getTracks } from "~/services/track";
import { verifyCookie } from "~/lib/validators";
import { useNavigate } from "react-router";
import { TrackCard } from "~/components/TrackCard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const user = verifyCookie(request);
  // console.log("user", user);
  const tracks = await getTracks();
  return {
    user,
    tracks,
  };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { theme, changeTheme } = useThemeContext();
  const track = loaderData.tracks;
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <h1 className="font-medium text-3xl text-accent1">Hello</h1>
      <Input
        type="email"
        label="Email"
        id="email"
        placeholder="Email"
        required={true}
      />
      <PrimaryBtn text="primary" />
      <PrimaryBtn text="Refresh" onClick={() => refresh()} />
      <SecundaryBtn text="secundary" />
      <PrimaryBtn text="light" onClick={() => changeTheme("light")} />
      <PrimaryBtn text="dark" onClick={() => changeTheme("dark")} />
      <PrimaryBtn text="system" onClick={() => changeTheme("system")} />
      <SearchInput
        value=""
        onChange={() => console.log("nada")}
        placeholder="Search"
      />
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-1">
        {track.map((e) => (
          <TrackCard
            key={e.id}
            id={e.id}
            trackUrl={e.url}
            thumbnailUrl={e.imgUrl}
            title={e.name}
            author={e.author.name}
            price={e.price}
          />
        ))}
      </div>
    </>
  );
}
