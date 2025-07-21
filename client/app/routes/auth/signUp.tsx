import type { Route } from "./+types/signUp";
import { Form, redirect } from "react-router";
import { Input } from "~/components/Input";
import { PrimaryBtn } from "~/components/PrimaryBtn";
import { LineWithText } from "~/components/LineWithText";
import { ProviderBtn } from "~/components/ProviderBtn";
import { signUp } from "~/services/auth";
import type { ApiResponse } from "~/types/api";
import type { AuthResponse, Credentials, NewUser } from "~/types/auth";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Register" },
    { name: "description", content: "Sign up to start selling" },
  ];
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const newUser: NewUser= {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    name: formData.get("name") as string,
    username: formData.get("username") as string,
    location: formData.get("location") as string,
  };
  const confirmPassword = formData.get("confirm-password") as string;

  if (newUser.password !== confirmPassword) {
    const res: ApiResponse<AuthResponse> = {
      success: false,
      error: "Passwords doesn't match",
    };
    return res;
  }

  const res = await signUp(newUser);

  if (res.success) {
    // TODO redirect to dashboard
    return redirect("/");
  }
  return res;
}

export default function SignUp({ actionData }: Route.ComponentProps) {
  return (
    <>
      <h2 className="text-3xl mb-7">Sign up</h2>
      <ProviderBtn className="w-full" provider="Google" />
      <LineWithText className="my-6" text="or" />
      <Form className="flex flex-col gap-4" method="post">
        <Input
          label="Email"
          id="email"
          type="email"
          placeholder="Email"
          required={true}
          // errorMessage="Not a valid email"
        />
        <Input
          label="Name"
          id="name"
          type="text"
          placeholder="Name"
          required={true}
        />
        <Input
          label="Username"
          id="username"
          type="text"
          placeholder="Username"
          required={true}
        />
        <Input
          label="Location"
          id="location"
          type="text"
          placeholder="Location"
          required={true}
        />
        <Input
          label="Password"
          id="password"
          type="password"
          placeholder="Password"
          required={true}
        />
        <Input
          label="Confirm Password"
          id="confirm-password"
          type="password"
          placeholder="Confirm password"
          required={true}
        />

        <PrimaryBtn className="w-full mt-5" text="Sign up" type="submit" />
        {actionData && <p className="text-accent3">{actionData.error}</p>}
      </Form>
    </>
  );
}
