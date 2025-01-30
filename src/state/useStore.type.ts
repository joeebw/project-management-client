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
  refetchBoards: (() => void) | null;
  setRefetchBoards: (refetch: () => void) => void;

  isConfirmationModal: boolean;
  configConfirmationModal: {
    title: string;
    description: string;
    confirmLabel?: string;
    cancelLabel?: string;
    onConfirm: () => void | Promise<void>;
  } | null;

  openConfirmationModal: (config: {
    title: string;
    description: string;
    confirmLabel?: string;
    cancelLabel?: string;
    onConfirm: () => void | Promise<void>;
  }) => void;
  closeConfirmationModal: () => void;
  setIsTaskModal: (bool: boolean) => void;
};

export interface StoreState extends Store, ProjectState {}
