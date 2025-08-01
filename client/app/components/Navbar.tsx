import { useState, type ChangeEvent } from "react";
import { SearchInput } from "./SearchInput";
import { SecundaryBtn } from "./SecundaryBtn";
import { PrimaryBtn } from "./PrimaryBtn";
import { Monitor, Moon, ShoppingCart, Sun } from "lucide-react";
import { useNavigate } from "react-router";
import { useUserContext } from "~/context/UserContext";
import { CartToast } from "./CartToast";
import { useCartContext } from "~/context/CartContext";
import { useThemeContext, type ThemeType } from "~/context/ThemeContext";

const themeIcons = [
  ["light", <Sun size={20} />],
  ["dark", <Moon size={20} />],
  ["system", <Monitor size={20} />],
];

export function Navbar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { user } = useUserContext();
  const [showCart, setShowCart] = useState(false);
  const { cart } = useCartContext();
  const { theme, changeTheme } = useThemeContext();

  return (
    <>
      <nav className="relative bg-slate-700 dark:bg-slate-800 py-2 px-3 flex justify-between items-center">
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
          <div className="flex gap-1">
            {themeIcons.map((e, i) => (
              <button
                key={i}
                className={`rounded p-1.5 text-text-dark ${theme === e[0] && "bg-slate-600"
                  }`}
                onClick={() => changeTheme(e[0] as ThemeType)}
              >
                {e[1]}
              </button>
            ))}
          </div>
          {!user ? (
            <div className="flex gap-1">
              <SecundaryBtn text="Sign in" onClick={() => navigate("/login")} />
              <PrimaryBtn text="Sign up" onClick={() => navigate("/signup")} />
            </div>
          ) : (
            <PrimaryBtn
              text="Upload Track"
              onClick={() => navigate("/new-track")}
            />
          )}
          <div
            className="text-white relative"
            onClick={() => setShowCart((ps) => !ps)}
          >
            {cart.length > 0 && (
              <div className="rounded-full aspect-square absolute bg-accent2 dark:bg-accent2-dark flex justify-center items-center -top-3 -right-2 h-5 w-5 p-0.5">
                <p>{cart.length}</p>
              </div>
            )}
            <ShoppingCart size={25} />
          </div>
        </div>
        {showCart && <CartToast cartItems={cart} />}
      </nav>
    </>
  );
}
