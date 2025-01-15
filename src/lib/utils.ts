import axios from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getErrorMessage = (err: unknown) => {
  return axios.isAxiosError(err)
    ? err.response?.data?.message || "Server Error"
    : "Connection Error";
};
