import { PrimaryBtn } from "./PrimaryBtn";

export function CartToast() {
  return (
    <div className="w-80 px-4 py-2">
      <h5 className="text-center text-xl font-medium mb-2">Your Cart (1)</h5>
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          <div className="aspect-square h-11 w-11 bg-gray-500 rounded-xs" />
          <div>
            <p className="font-medium">[title]</p>
            <p className="text-sm">[author]</p>
          </div>
        </div>
        <p>
          $99.99
        </p>
      </div>
      <PrimaryBtn className="w-full" text="Checkout" />
    </div>
  );
}
