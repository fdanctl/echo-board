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
import { TrackCard } from "~/components/TrackCard";
import { Form } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  console.log(q)
  const user = verifyCookie(request);
  // console.log("user", user);
  const tracks = await getTracks({q: q});
  return {
    user,
    tracks,
  };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { changeTheme } = useThemeContext();
  const track = loaderData.tracks;
  //  const searc
  //
  //  const [searchParams, setSearchParams] = useSearchParams();
  //
  //  setSearchParams((params) => {
  //    if (q !== undefined) {
  //      if (filters.q.length === 0) {
  //        params.delete("q");
  //      } else {
  //        params.set("q", filters.q);
  //      }
  //    }
  //
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
      <Form method="get">
        <SearchInput id="q" placeholder="Search" />
      </Form>
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
