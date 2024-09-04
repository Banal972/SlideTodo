import { create } from "zustand"

interface Store {
  isModal: boolean
  todoId: number | null
  open: ({ todoId }: { todoId?: number }) => void
  close: () => void
}

const useNewTodoModalStore = create<Store>((set) => ({
  isModal: false,
  todoId: null,
  open: ({ todoId }) => set(() => ({ isModal: true, todoId: todoId || null })),
  close: () => set(() => ({ isModal: false })),
}))

export default useNewTodoModalStore
