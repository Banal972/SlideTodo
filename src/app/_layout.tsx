import SideMenu from "@/components/common/SideMenu/SideMenu"
import NoteDetailModal from "@/components/page/note/DetailModal"
import TodoAddModal from "@/components/page/todo/TodoAddModal/TodoAddModal"
import Color from "@/constant/color"
import useNewTodoModalStore from "@/store/useNewTodoModalStore"
import useNoteDetailModalStore from "@/store/useNoteDetailModalStore"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Drawer } from "expo-router/drawer"

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

const CustomDrawerContent = ({ navigation, state }: any) => {
  if (["(auth)"].includes(state.routeNames[state.index])) {
    return null
  }
  return <SideMenu navigation={navigation} />
}

export default function RootLayout() {
  const { isModal } = useNoteDetailModalStore()
  const { isModal: addIsModal } = useNewTodoModalStore()

  return (
    <QueryClientProvider client={queryClient}>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={({ route }) => ({
          sceneContainerStyle: {
            backgroundColor: Color.slate100,
          },
          drawerStyle: {
            width: "100%",
          },
          swipeEnabled: !["(auth)"].includes(route.name),
          drawerType: ["(auth)"].includes(route.name) ? "front" : "slide",
        })}
      >
        <Drawer.Screen
          name="(auth)"
          options={{ headerShown: false, drawerItemStyle: { display: "none" } }}
        />

        <Drawer.Screen name="dashboard/index" />
        <Drawer.Screen name="alltodo/index" />
        <Drawer.Screen name="goal/[slug]" />
        <Drawer.Screen name="note/list/[slug]" />
      </Drawer>

      <NoteDetailModal isModal={isModal} />
      <TodoAddModal isModal={addIsModal} />
    </QueryClientProvider>
  )
}
