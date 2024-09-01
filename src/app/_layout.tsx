import NoteDetailModal from "@/components/page/note/DetailModal"
import TodoAddModal from "@/components/page/todo/TodoAddModal/TodoAddModal"
import AuthProvider from "@/provider/AuthProvider"
import useNewTodoModalStore from "@/store/useNewTodoModalStore"
import useNoteDetailModalStore from "@/store/useNoteDetailModalStore"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Slot } from "expo-router"

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
      <AuthProvider>
        <Slot />
      </AuthProvider>
      <NoteDetailModal isModal={isModal} />
      <TodoAddModal isModal={addIsModal} />
    </QueryClientProvider>
  )
}
