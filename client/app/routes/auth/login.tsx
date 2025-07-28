import { Form, redirect } from "react-router";
import type { Route } from "./+types/login";
import { Input } from "~/components/Input";
import { PrimaryBtn } from "~/components/PrimaryBtn";
import { LineWithText } from "~/components/LineWithText";
import { ProviderBtn } from "~/components/ProviderBtn";
import { Anchor } from "~/components/Anchor";
import { login } from "~/services/auth";
import type { Credentials } from "~/types/auth";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Login" },
    { name: "description", content: "Login to start selling" },
  ];
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const credentials: Credentials = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const res = await login(credentials);

  if (res.success) {
    localStorage.setItem("user", JSON.stringify(res.data));
    return redirect("/");
  }
  return res;
}

export default function Login({ actionData }: Route.ComponentProps) {
  return (
    <>
      <h2 className="text-3xl mb-7">Welcome back</h2>
      {actionData?.success === false && (
        <p className="text-accent3 mb-3">
          That email and password combination is incorrect.
        </p>
      )}
      <Form className="flex flex-col" method="post">
        <Input
          className="mb-4"
          label="Email"
          id="email"
          type="email"
          placeholder="Email"
          required={true}
        //errorMessage="Not a valid email"
        />
        <Input
          label="Password"
          id="password"
          type="password"
          placeholder="Password"
          required={true}
        />
        <Anchor
          className="self-end mt-0.5 mb-5 text-sm"
          text="Forgot password?"
          to="/password-recover"
        />
        <PrimaryBtn className="w-full" text="Login" type="submit" />
      </Form>
      <p className="mt-4">
        Don’t have an account?{" "}
        <Anchor className="font-medium" text="Sign up" to="/signup" />
      </p>
      <LineWithText className="mt-4 mb-6" text="or" />
      <ProviderBtn className="w-full" provider="Google" />
    </>
  );
}
