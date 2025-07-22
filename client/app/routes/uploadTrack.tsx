import { Form } from "react-router";
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

export function meta({}: Route.MetaArgs) {
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

interface Form {
  file: File | null;
  name: string;
  trackType: "BEAT" | "VOCAL" | null;
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
    trackType: null,
    genre: "",
    mood: "",
    tags: [],
    bpm: "",
    price: "",
  });

  const handleSubmit = async () => {
    console.log(form);

    // await authenticatedFetch(() => postTrack(formData));
  };

  const setFile = (f: File | null) => {
    if (f && form.name === "") {
      setForm((ps) => ({ ...ps, file: f, name: f.name }));
    } else {
      setForm((ps) => ({ ...ps, file: f }));
    }
  };

  // TODO Make a handler

  return (
    <>
      <h1 className="font-medium text-3xl text-accent1">Hello</h1>
      <Form action="post">
        <FileInput
          file={form.file}
          label="Track"
          id="track"
          setFile={setFile}
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
        <div className="flex ">
          <SelectInput
            label="Track Type"
            placeholder="Choose a type"
            options={loaderData.trackType}
            id="trackType"
            onChange={(selected: string) =>
              setForm((ps) => ({ ...ps, genre: selected }))
            }
          />
          <SelectInput
            label="Genre"
            placeholder="Choose a genre"
            options={loaderData.genre}
            id="genre"
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
            value={form.mood}
            onChange={(selected: string) =>
              setForm((ps) => ({ ...ps, mood: selected }))
            }
          />
        </div>
        <div className="flex">
          <DropdownWithSearch
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
          />
          <Input
            type="text"
            label="Price"
            placeholder="100"
            id="Price"
            required={true}
          />
        </div>
        <PrimaryBtn text="submit" type="button" onClick={handleSubmit} />
      </Form>
    </>
  );
}
