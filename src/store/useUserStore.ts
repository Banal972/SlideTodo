import { create } from "zustand"

interface UserType {
  id: number
  email: string
  name: string
  createdAt: Date
  updatedAt: Date
}

interface Store {
  user: UserType | null
  updateUser: (user: UserType) => void
}

const useUserStore = create<Store>((set) => ({
  user: null,
  updateUser: (user: UserType) => set(() => ({ user })),
}))

export default useUserStore
