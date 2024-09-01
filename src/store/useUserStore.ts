import { create } from "zustand"

interface Store {
  token: boolean
  signIn: () => void
  signOut: () => void
}

const useUserStore = create<Store>((set) => ({
  token: false,
  signIn: () => set(() => ({ token: true })),
  signOut: () => set(() => ({ token: false })),
}))

export default useUserStore
