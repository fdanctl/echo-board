import type { Route } from "./+types/home";
import { SearchInput } from "~/components/SearchInput";
import { DropdownWithSearch } from "~/components/DropdownWithSearch";
import { getTracks } from "~/services/track";
import { verifyCookie } from "~/lib/validators";
import { TrackCard } from "~/components/TrackCard";
import { Form, useSubmit } from "react-router";
import { getTrackOptions } from "~/services/trackOptions";
import { useTrackContext } from "~/context/TrackContext";
import { ActionType, useCartContext } from "~/context/CartContext";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Home" },
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
  const track = loaderData.tracks;
  const trackOpts = loaderData.trackOpts;
  const submit = useSubmit();
  const initialForm = loaderData.form;
  const { changeCurrTrack } = useTrackContext();
  const { dispatch } = useCartContext();

  return (
    <div className="px-4 mt-4">
      <Form method="get">
        <SearchInput id="q" placeholder="Search" />
        <div className="flex mt-2">
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
            thumbnailUrl={e.imgUrl}
            title={e.name}
            author={e.author.name}
            price={e.price}
            onPlayClick={() => changeCurrTrack(e)}
            onAddCartClick={() =>
              dispatch({ type: ActionType.ADD_ITEM, payload: e })
            }
          />
        ))}
      </div>
    </div>
  );
}
