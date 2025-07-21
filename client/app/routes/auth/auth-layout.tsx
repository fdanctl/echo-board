import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="min-h-dvh md:grid md:grid-cols-2">
      <div className="flex flex-col items-center justify-center px-4">
        <h1 className="text-accent2 dark:text-accent2-dark w-full text-center md:text-left pt-4 text-4xl">
          EchoBoard
        </h1>
        <div className="m-auto h-full mt-8 text-center w-full max-w-96">
          <Outlet />
        </div>
      </div>
      <div className="hidden md:block w-full bg-gradient-to-b from-accent1/65 to-accent1-dark/55" />
    </div>
  );
}
