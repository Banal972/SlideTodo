import { create } from "zustand"

export interface openType {
  goalTitle: string
  todoTitle: string
  id: string
  date: string
}

interface Store {
  isModal: boolean
  data: openType
  open: ({ goalTitle, todoTitle, id, date }: openType) => void
  close: () => void
}

const useNoteDetailModalStore = create<Store>((set) => ({
  isModal: false,
  data: {
    goalTitle: "",
    todoTitle: "",
    id: "",
    date: "2022-01-01",
  },
  open: ({ goalTitle, todoTitle, id, date }: openType) =>
    set(() => ({ isModal: true, data: { goalTitle, todoTitle, id, date } })),
  close: () =>
    set(() => ({
      isModal: false,
      data: {
        goalTitle: "",
        todoTitle: "",
        id: "",
        date: "2022-01-01",
      },
    })),
}))

export default useNoteDetailModalStore
