import { type UserRole } from "@katitb2024/database";
export type UserInsertPayload = {
  nim: string;
  password: string;
  role: UserRole;
};

export type UserDeletePayload = {
  id: string;
};


