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
import { Form, useSubmit } from "react-router";
import { getTrackOptions } from "~/services/trackOptions";
import { useState } from "react";
import { useTrackContext } from "~/context/TrackContext";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const trackOpts = await getTrackOptions();

  const q = url.searchParams.get("q");
  const trackTypes = url.searchParams
    .getAll("track_types")
    .map((e) => Number(e));
  const moods = url.searchParams.getAll("moods").map((e) => Number(e));
  const genres = url.searchParams.getAll("genres").map((e) => Number(e));
  const tags = url.searchParams.getAll("tags").map((e) => Number(e));
  const keys = url.searchParams.getAll("keys").map((e) => Number(e));

  const user = verifyCookie(request);

  const form = { q: q ?? "", trackTypes, moods, genres, tags, keys };
  const tracks = await getTracks(form);

  return {
    user,
    tracks,
    trackOpts,
    form,
  };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { changeTheme } = useThemeContext();
  const track = loaderData.tracks;
  const trackOpts = loaderData.trackOpts;
  const submit = useSubmit();
  const initialForm = loaderData.form;
  const { changeCurrTrack } = useTrackContext();

  return (
    <>
      <PrimaryBtn text="primary" />
      <PrimaryBtn text="Refresh" onClick={() => refresh()} />
      <SecundaryBtn text="secundary" />
      <PrimaryBtn text="light" onClick={() => changeTheme("light")} />
      <PrimaryBtn text="dark" onClick={() => changeTheme("dark")} />
      <PrimaryBtn text="system" onClick={() => changeTheme("system")} />

      <Form method="get">
        <SearchInput id="q" placeholder="Search" />
        <div className="flex">
          <DropdownWithSearch
            initialSelected={initialForm.trackTypes}
            id="track_types"
            label="Track Type"
            options={trackOpts.trackType}
            onChange={(e) => submit(e.currentTarget.form)}
          />
          <DropdownWithSearch
            initialSelected={initialForm.moods}
            id="moods"
            label="Moods"
            options={trackOpts.mood}
            onChange={(e) => submit(e.currentTarget.form)}
          />
          <DropdownWithSearch
            initialSelected={initialForm.genres}
            id="genres"
            label="Genres"
            options={trackOpts.genre}
            onChange={(e) => submit(e.currentTarget.form)}
          />
          <DropdownWithSearch
            initialSelected={initialForm.tags}
            id="tags"
            label="Tags"
            options={trackOpts.tag}
            onChange={(e) => submit(e.currentTarget.form)}
          />
          <DropdownWithSearch
            initialSelected={initialForm.keys}
            id="keys"
            label="Key"
            options={trackOpts.key}
            onChange={(e) => submit(e.currentTarget.form)}
          />
        </div>
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
            onPlayClick={() => changeCurrTrack(e)}
          />
        ))}
      </div>
    </>
  );
}
