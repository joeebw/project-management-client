import { Comment } from "@/features/project/ts/kanban.type";

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
  // Project states
  projectSection: string;

  // Project actions
  setProjectSection: (section: string) => void;

  // Modal states
  isProjectModal: boolean;
  isTaskModal: boolean;
  isConfirmationModal: boolean;

  // Modal actions
  setIsProjectModal: (bool: boolean) => void;
  setIsTaskModal: (bool: boolean) => void;

  // Confirmation modal config
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

  // Refetch functions
  refetchBoards: (() => void) | null;
  refetchProjects: (() => void) | null;
  refetchList: (() => void) | null;
  refetchTable: (() => void) | null;
  setRefetchBoards: (refetch: () => void) => void;
  setRefetchProjects: (refetch: () => void) => void;
  setRefetchList: (refetch: () => void) => void;
  setRefetchTable: (refetch: () => void) => void;

  // Comments handling
  comments: Record<string, Comment[]>;
  setComments: (taskId: number, comments: Comment[]) => void;
  addComment: (taskId: number, comment: Comment) => void;
};

export interface StoreState extends Store, ProjectState {}
