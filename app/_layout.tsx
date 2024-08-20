import SideMenu from "@/components/common/SideMenu"
import TodoAddModal from "@/components/page/todo/TodoAddModal"
import Color from "@/constant/color"
import useNewTodoModalStore from "@/store/useNewTodoModalStore"
import { Drawer } from "expo-router/drawer"
import { StatusBar } from "expo-status-bar"

const RootLayout = () => {
  const { newPostIsModal: isModal } = useNewTodoModalStore()

  return (
    <>
      <Drawer
        drawerContent={({ navigation }) => <SideMenu navigation={navigation} />}
        screenOptions={{
          sceneContainerStyle: {
            backgroundColor: Color.slate100,
          },
          drawerStyle: {
            width: "100%",
          },
        }}
      >
        <Drawer.Screen name="(auth)" options={{ headerShown: false }} />
        <Drawer.Screen
          name="todo/index"
          options={{
            title: "",
          }}
        />
        <Drawer.Screen
          name="goal/[slug]"
          options={{
            title: "목표",
          }}
        />
        <Drawer.Screen
          name="note/list/[slug]"
          options={{
            title: "",
          }}
        />
        <Drawer.Screen
          name="dashboard/index"
          options={{
            title: "대시보드",
          }}
        />
      </Drawer>
      <TodoAddModal isModal={isModal} />
      <StatusBar style="dark" />
    </>
  )
}

export default RootLayout
