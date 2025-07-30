import { Input } from "~/components/Input";
import { DropdownWithSearch } from "~/components/DropdownWithSearch";
import type { Route } from "./+types/uploadTrack";
import { FileInput } from "~/components/FileInput";
import { useState, type ChangeEvent } from "react";
import { SelectInput } from "~/components/SelectInput";
import { authenticatedFetch } from "~/services/api";
import { PrimaryBtn } from "~/components/PrimaryBtn";
import { Form, redirect } from "react-router";
import { postTrack } from "~/services/track";
import { getTrackOptions } from "~/services/trackOptions";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Upload Track" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader() {
  return await getTrackOptions();
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  console.log("price: ", formData.get("price"));

  await authenticatedFetch(() => postTrack(formData));
  redirect("/");
}

interface Form {
  track: File | null;
  img: File | null;
  name: string;
  trackType: string;
  genre: string;
  mood: string;
  key: string;
  tags: number[];
  bpm: string;
  price: string;
}

export default function UploadTrack({ loaderData }: Route.ComponentProps) {
  // TODO fix spaghetti (most likely don't need state, browser is handle it)
  // TODO make form more appealing
  const [form, setForm] = useState<Form>({
    track: null,
    img: null,
    name: "",
    trackType: "",
    genre: "",
    mood: "",
    key: "",
    tags: [],
    bpm: "",
    price: "",
  });

  const setFile = (f: File | null) => {
    if (f && form.name === "") {
      setForm((ps) => ({ ...ps, track: f, name: f.name }));
    } else {
      setForm((ps) => ({ ...ps, track: f }));
    }
  };

  const setFile2 = (f: File | null) => {
    setForm((ps) => ({ ...ps, img: f }));
  };

  const handleChangeNumberInputs = (
    e: ChangeEvent<HTMLInputElement>,
    key: "bpm" | "price"
  ) => {
    const input = e.target.value;
    if (Number(input) || input === "") {
      setForm((ps) => ({ ...ps, [key]: input }));
    }
  };

  return (
    <>
      <h1 className="font-medium text-3xl text-accent1">Hello</h1>
      <Form method="post" encType="multipart/form-data">
        <FileInput
          file={form.track}
          label="Track"
          id="track"
          setFile={setFile}
          acceptedFiles="audio/*"
          required
        />
        <FileInput
          file={form.img}
          label="Image"
          id="img"
          setFile={setFile2}
          acceptedFiles="image/*"
          required
        />
        <Input
          type="text"
          label="Track Name"
          placeholder="Track Name"
          id="name"
          required={true}
          value={form.name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setForm((ps) => ({ ...ps, name: e.target.value }))
          }
        />
        <div className="flex">
          <SelectInput
            label="Track Type"
            placeholder="Choose a type"
            options={loaderData.trackType}
            id="trackType"
            required
            value={form.trackType}
            onChange={(selected: string) =>
              setForm((ps) => ({ ...ps, trackType: selected }))
            }
          />
          <SelectInput
            label="Genre"
            placeholder="Choose a genre"
            options={loaderData.genre}
            id="genre"
            required
            value={form.genre}
            onChange={(selected: string) =>
              setForm((ps) => ({ ...ps, genre: selected }))
            }
          />
          <SelectInput
            label="Mood"
            placeholder="Choose a mood"
            options={loaderData.mood}
            id="mood"
            required
            value={form.mood}
            onChange={(selected: string) =>
              setForm((ps) => ({ ...ps, mood: selected }))
            }
          />
          <SelectInput
            label="Key (optional)"
            placeholder="Selecet a key"
            options={loaderData.key}
            id="key"
            required
            value={form.key}
            onChange={(selected: string) =>
              setForm((ps) => ({ ...ps, key: selected }))
            }
          />
        </div>
        <div className="flex">
          <DropdownWithSearch id="tags" label="Tags" options={loaderData.tag} />
          <Input
            type="text"
            label="BPM"
            placeholder="100"
            id="bpm"
            required={true}
            value={form.bpm}
            onChange={(e) => handleChangeNumberInputs(e, "bpm")}
          />
          <Input
            type="text"
            label="Price"
            placeholder="100"
            id="price"
            required={true}
            value={form.price}
            onChange={(e) => handleChangeNumberInputs(e, "price")}
          />
        </div>
        <PrimaryBtn
          text="submit"
          type="submit"
          //onClick={() => console.log(form)}
        />
      </Form>
    </>
  );
}
