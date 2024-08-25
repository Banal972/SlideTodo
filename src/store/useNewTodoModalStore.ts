import { create } from "zustand"

interface Store {
  isModal: boolean
  open: () => void
  close: () => void
}

const useNewTodoModalStore = create<Store>((set) => ({
  isModal: false,
  open: () => set(() => ({ isModal: true })),
  close: () => set(() => ({ isModal: false })),
}))

export default useNewTodoModalStore
