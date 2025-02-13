import { Store, StoreState, User } from "@/state/useStore.type";
import { StateCreator } from "zustand";

const INITIAL_STORE_STATE = {
  isSignIn: true,
  user: null,
};

export const createAuthSlice: StateCreator<StoreState, [], [], Store> = (
  set
) => ({
  ...INITIAL_STORE_STATE,
  setIsSignIn: () => set((state) => ({ isSignIn: !state.isSignIn })),
  setUser: (user: User) => set(() => ({ user })),
  resetAuthStore: () => set(INITIAL_STORE_STATE),
});
