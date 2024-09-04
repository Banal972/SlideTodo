import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import NoteDetailModal from "components/page/note/DetailModal"
import TodoAddModal from "components/page/todo/TodoAddModal/TodoAddModal"
import { Slot } from "expo-router"
import useNewTodoModalStore from "store/useNewTodoModalStore"
import useNoteDetailModalStore from "store/useNoteDetailModalStore"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 1,
    },
  },
})

export default function RootLayout() {
  const { isModal } = useNoteDetailModalStore()
  const { isModal: addIsModal } = useNewTodoModalStore()

  return (
    <QueryClientProvider client={queryClient}>
      <Slot />
      <NoteDetailModal isModal={isModal} />
      <TodoAddModal isModal={addIsModal} />
    </QueryClientProvider>
  )
}
