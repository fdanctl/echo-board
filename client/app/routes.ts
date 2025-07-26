import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  layout("./routes/auth/auth-layout.tsx", [
    route("login", "./routes/auth/login.tsx"),
    route("signup", "./routes/auth/signUp.tsx"),
  ]),
  route("new-track", "./routes/uploadTrack.tsx"),
  route("track/:track", "./routes/trackPage.tsx"),
  route("user/:username", "./routes/userPage.tsx"),
  route("api/auth/refresh", "./routes/auth/refresh.ts"),
] satisfies RouteConfig;
