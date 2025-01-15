import { User } from "@/state/useStore.type";

export type RegisterParams = {
  userName: string;
  email: string;
  password: string;
  role: string;
};

export type SignInResp = {
  accessToken: string;
  refreshToken: string;
  user: User;
};

export type RegisterResp = SignInResp;
