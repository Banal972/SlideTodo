import { User } from "firebase/auth";
import { create } from "zustand";

interface Store {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const useUserStore = create<Store>((set) => ({
  user: null,
  login: (user: User) => set(() => ({ user: user })),
  logout: () => set(() => ({ user: null })),
}));

export default useUserStore;
