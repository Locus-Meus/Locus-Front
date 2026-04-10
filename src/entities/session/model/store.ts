import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

interface SessionState {
  isAuth: boolean;
  token: string | null;
  user: User | null;
  // Actions
  setAuth: (token: string, user: User) => void;
  logout: () => void;
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      isAuth: false,
      token: null,
      user: null,

      setAuth: (token, user) =>
        set({
          token,
          user,
          isAuth: true,
        }),

      logout: () =>
        set({
          token: null,
          user: null,
          isAuth: false,
        }),
    }),
    {
      name: 'vis-session-storage', // Key in LocalStorage
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
