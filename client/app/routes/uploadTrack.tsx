import { Input } from "~/components/Input";
import { DropdownWithSearch } from "~/components/DropdownWithSearch";
import type { Route } from "./+types/uploadTrack";
import { FileInput } from "~/components/FileInput";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { SelectInput } from "~/components/SelectInput";
import { authenticatedFetch, BASE_URL } from "~/services/api";
import type { ApiResponse } from "~/types/api";
import type { TrackOptions } from "~/types/trackOptions";
import { PrimaryBtn } from "~/components/PrimaryBtn";
import { Form } from "react-router";
import type { TrackForm } from "~/types/tracks";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function clientLoader() {
  const res = await fetch(`${BASE_URL}/track-options`);

  const json = (await res.json()) as ApiResponse<TrackOptions>;

  if (json.success) {
    return json.data;
  } else {
    throw new Error(`Failed to fetch: ${json.error}`);
  }
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();

  const trackForm: TrackForm = {
    file: formData.get("track") as File,
    name: String(formData.get("name")),
    trackType: Number(formData.get("trackType")),
    genre: Number(formData.get("genre")),
    mood: Number(formData.get("mood")),
    tags: formData.getAll("tags").map((id) => Number(id)),
    bpm: Number(formData.get("bpm")),
    price: Number(formData.get("price")),
  };

  console.log(trackForm.file);
  // await authenticatedFetch(() => postTrack(formData));
}

interface Form {
  file: File | null;
  name: string;
  trackType: string;
  genre: string;
  mood: string;
  tags: number[];
  bpm: string;
  price: string;
}

export default function UploadTrack({ loaderData }: Route.ComponentProps) {
  const [form, setForm] = useState<Form>({
    file: null,
    name: "",
    trackType: "",
    genre: "",
    mood: "",
    tags: [],
    bpm: "",
    price: "",
  });

  const setFile = (f: File | null) => {
    if (f && form.name === "") {
      setForm((ps) => ({ ...ps, file: f, name: f.name }));
    } else {
      setForm((ps) => ({ ...ps, file: f }));
    }
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
          file={form.file}
          label="Track"
          id="track"
          setFile={setFile}
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
        </div>
        <div className="flex">
          <DropdownWithSearch
            id="tags"
            label="Tags"
            options={loaderData.tag}
            onChange={(selected: number[]) =>
              setForm((ps) => ({ ...ps, tags: selected }))
            }
          />
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
