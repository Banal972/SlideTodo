import { create } from "zustand"

interface Store {
  todoName: string
  changeName: ({ todoName }: { todoName: string }) => void
}

const useNotePostStore = create<Store>((set) => ({
  todoName: "",
  changeName: ({ todoName }: { todoName: string }) => set({ todoName }),
}))

export default useNotePostStore
