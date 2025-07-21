import { JwtPayload } from "jsonwebtoken";

export interface Credentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  id: string;
  email: string;
}

export interface NewUser {
  email: string;
  name: string;
  password: string;
}

export type TokenType = "access" | "refresh";
export interface JwtPayloadCustom extends JwtPayload {
  sub: string;
  tokenType: TokenType;
  isFresh: boolean;
}
