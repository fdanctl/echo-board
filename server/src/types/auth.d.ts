import { JwtPayload } from "jsonwebtoken";

export interface Credentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  id: string;
  email: string;
  username: string;
}

export interface NewUser extends Credentials {
  name: string;
  username: string;
  location: string;
}


export type TokenType = "access" | "refresh";
export interface JwtPayloadCustom extends JwtPayload {
  sub: string;
  username: string;
  tokenType: TokenType;
  isFresh: boolean;
}
