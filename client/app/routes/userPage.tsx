import { Input } from "~/components/Input";
import type { Route } from "./+types/userPage";
import { UserHero } from "~/components/UserHero";
import { CartToast } from "~/components/CartToast";
import { verifyCookie } from "~/lib/validators";
import { redirect } from "react-router";
import { getUserInfo } from "~/services/user";
import { getUserTracks } from "~/services/track";
import { TrackCard } from "~/components/TrackCard";

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
  const tracks = await getUserTracks(params.username);
  return {
    producer,
    tracks,
  };
}

export default function UploadTrack({ loaderData }: Route.ComponentProps) {
  const producer = loaderData.producer;
  const tracks = loaderData.tracks;
  return (
    <>
      <UserHero
        name={producer.name}
        location={producer.location}
        followers={producer.followers}
        tracksN={producer.tracksN}
        plays={producer.plays}
      />
      <section className="px-4">
      <h3 className="text-2xl mt-4">Tracks</h3>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-1">
        {tracks.map((e) => (
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
      </section>
    </>
  );
}
