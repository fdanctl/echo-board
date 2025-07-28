import type { JwtPayload } from "jsonwebtoken";

export interface Credentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  id: string;
  name: string;
  username: string;
  avatarUrl: string | null;
}

export interface NewUser extends Credentials {
  name: string;
  username: string;
  location: string;
}

type TokenType = "access" | "refresh";
export interface JwtPayloadCustom extends JwtPayload {
  sub: string;
  tokenType: TokenType;
  isFresh: boolean;
}
