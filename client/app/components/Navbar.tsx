import { useState, type ChangeEvent } from "react";
import { SearchInput } from "./SearchInput";
import { SecundaryBtn } from "./SecundaryBtn";
import { PrimaryBtn } from "./PrimaryBtn";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router";
import { useUserContext } from "~/context/UserContext";

export function Navbar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { user } = useUserContext();

  return (
    <nav className="bg-slate-700 dark:bg-slate-800 py-2 px-3 flex justify-between items-center">
      <h1 className="text-2xl text-accent2" onClick={() => navigate("/")}>
        EchoBoard
      </h1>
      {/* TODO change search input */}
      <SearchInput
        id="id"
        value={search}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearch(e.target.value)
        }
      />
      <div className="flex gap-4 items-center">
        {!user ? (
          <div className="flex gap-1">
            <SecundaryBtn text="Sign in" onClick={() => navigate("/login")} />
            <PrimaryBtn text="Sign up" onClick={() => navigate("/signup")} />
          </div>
        ) : (
          <PrimaryBtn text="Upload Track" />
        )}
        <div className="text-white">
          <ShoppingCart size={25} />
        </div>
      </div>
    </nav>
  );
}
