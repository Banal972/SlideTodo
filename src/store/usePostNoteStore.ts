import { create } from "zustand"

interface StoreData {
  title: string
  todoTitle: string
}

interface Store {
  data: StoreData
  changeData: (changeData: StoreData) => void
}

const usePostNoteStore = create<Store>((set) => ({
  data: {
    title: "",
    todoTitle: "",
  },
  changeData: (changeData) => set((state) => ({ data: { ...state, ...changeData } })),
}))

export default usePostNoteStore
