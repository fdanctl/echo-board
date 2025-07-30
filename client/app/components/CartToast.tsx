import type { TrackInfo } from "~/types/tracks";
import { PrimaryBtn } from "./PrimaryBtn";
import { formatPrice } from "~/lib/utils";

interface CartToastProps {
  className?: string;
  cartItems: TrackInfo[];
}

export function CartToast({ className, cartItems }: CartToastProps) {
  return (
    <div className={`w-96 text-slate-100 px-4 py-2 absolute rounded bg-slate-700 dark:bg-slate-800 z-50 right-0.5 top-[66px] ${className}`}>
      <h5 className="text-center text-xl font-medium mb-2">
        Your Cart ({cartItems.length})
      </h5>

      <div className="w-full">
        {cartItems.map((e) => (
          <div
            key={e.id}
            className="flex justify-between items-center mb-4 w-full"
          >
            <div className="flex gap-2 w-4/5 justify-between">
              <div className="aspect-square h-11 w-11 bg-gray-500 rounded-xs">
                <img
                  className="object-cover w-full h-full rounded-xs"
                  src={`http://localhost:4000${e.imgUrl}`}
                />
              </div>
              <div className="flex flex-col flex-grow min-w-0">
                <p className="font-medium truncate">{e.name}</p>
                <p className="text-sm">{e.author.name}</p>
              </div>
            </div>
            <p>${formatPrice(e.price)}</p>
          </div>
        ))}
      </div>
      <PrimaryBtn className="w-full" text="Checkout" />
    </div>
  );
}
