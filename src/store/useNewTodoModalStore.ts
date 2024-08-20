import { create } from "zustand"

interface Store {
  newPostIsModal: boolean
  open: () => void
  close: () => void
}

const useNewTodoModalStore = create<Store>((set) => ({
  newPostIsModal: false,
  open: () => set(() => ({ newPostIsModal: true })),
  close: () => set(() => ({ newPostIsModal: false })),
}))

export default useNewTodoModalStore
