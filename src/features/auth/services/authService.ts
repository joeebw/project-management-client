import {
  RegisterParams,
  RegisterResp,
  SignInResp,
} from "@/features/auth/ts/authService.type";
import api from "@/lib/apiService";
import { getErrorMessage } from "@/lib/utils";

const signIn = async (email: string, password: string) => {
  try {
    const response = await api.post<SignInResp>("/auth/signIn", {
      email,
      password,
    });
    return response.data;
  } catch (err) {
    throw getErrorMessage(err);
  }
};

const signInGuest = async () => {
  try {
    const response = await api.post<SignInResp>("/auth/signInGuest");
    return response.data;
  } catch (err) {
    throw getErrorMessage(err);
  }
};

const register = async ({
  email,
  userName,
  password,
  role,
}: RegisterParams) => {
  try {
    const response = await api.post<RegisterResp>("/auth/register", {
      email,
      password,
      userName,
      role,
    });
    return response.data;
  } catch (err) {
    throw getErrorMessage(err);
  }
};

export default {
  signIn,
  register,
  signInGuest,
};
