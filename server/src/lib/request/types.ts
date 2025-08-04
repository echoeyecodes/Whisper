import { Request } from "express";

export type AuthRequest = Request & {
  auth_user_id?: string;
};
