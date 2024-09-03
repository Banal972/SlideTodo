import { create } from "zustand"

export interface openType {
  noteId: number
}

interface Store {
  isModal: boolean
  data: openType
  open: ({ noteId }: openType) => void
  close: () => void
}

const useNoteDetailModalStore = create<Store>((set) => ({
  isModal: false,
  data: {
    noteId: 0,
  },
  open: ({ noteId }: openType) => set(() => ({ isModal: true, data: { noteId } })),
  close: () =>
    set(() => ({
      isModal: false,
      data: {
        noteId: 0,
      },
    })),
}))

export default useNoteDetailModalStore
