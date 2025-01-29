export type User = {
  email: string;
  id: number;
  userName: string;
} | null;

export type Store = {
  isSignIn: boolean;
  user: User | null;
  setIsSignIn: () => void;
  setUser: (user: User) => void;
  resetStore: () => void;
};

export type ProjectState = {
  isTaskModal: boolean;
  setIsTaskModal: (bool: boolean) => void;
};

export interface StoreState extends Store, ProjectState {}
