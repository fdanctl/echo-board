import { useState, type ChangeEvent } from "react";
import { SearchInput } from "./SearchInput";
import { SecundaryBtn } from "./SecundaryBtn";
import { PrimaryBtn } from "./PrimaryBtn";
import { ShoppingCart } from "lucide-react";

export function Navbar() {
  const [search, setSearch] = useState("");
  return (
    <nav className="bg-gray-800 py-2 px-3 flex justify-between items-center">
      <h1 className="text-2xl text-accent2">EchoBoard</h1>
      {/* TODO change search input */}
      <SearchInput
        id="id"
        value={search}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearch(e.target.value)
        }
      />
      <div className="flex gap-3 items-center">
        <SecundaryBtn text="Sign in" />
        <PrimaryBtn text="Sign up" />
        <div className="text-white">
          <ShoppingCart size={25} />
        </div>
      </div>
    </nav>
  );
}
