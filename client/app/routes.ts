import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [

  layout("./routes/auth/auth-layout.tsx", [
    route("login", "./routes/auth/login.tsx"),
    route("signup", "./routes/auth/signUp.tsx"),
  ]),

  layout("./routes/player-layout.tsx", [
    index("routes/home.tsx"),
    route("new-track", "./routes/uploadTrack.tsx"),
    route("track/:track", "./routes/trackPage.tsx"),
    route("user/:username", "./routes/userPage.tsx"),
    route("api/auth/refresh", "./routes/auth/refresh.ts"),
  ]),
] satisfies RouteConfig;
