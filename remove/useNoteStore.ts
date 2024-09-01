import { create } from "zustand"

interface Store {
  name: string
  changeName: (name: string) => void
}

const useNoteNameStore = create<Store>((set) => ({
  name: "",
  changeName: (name: string) => set({ name }),
}))

export default useNoteNameStore
