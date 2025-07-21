import { Request } from "express";

export type ApiResponse<T> =
  | {
    success: true;
    data: T;
  }
  | {
    success: false;
    error: string;
    code?: string;
    details?: Record<string, string>;
  };

export interface AuthenticatedRequest extends Request {
  user?: string | JwtPayloadCustom;
}
