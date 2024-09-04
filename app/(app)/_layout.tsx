import SideMenu from "components/common/SideMenu/SideMenu"
import Color from "constant/color"
import { Drawer } from "expo-router/drawer"
import AuthProvider from "provider/AuthProvider"

export default function AppLayout() {
  return (
    <AuthProvider>
      <Drawer
        drawerContent={(props) => <SideMenu {...props} />}
        screenOptions={() => ({
          sceneContainerStyle: {
            backgroundColor: Color.slate100,
          },
          drawerStyle: {
            width: "100%",
          },
        })}
      >
        <Drawer.Screen
          name="index"
          options={{ headerTitle: "대시보드", headerTitleAlign: "left" }}
        />
        <Drawer.Screen
          name="alltodo/index"
          options={{ headerTitle: "", headerTitleAlign: "left" }}
        />
        <Drawer.Screen
          name="goal/[slug]"
          options={{ headerTitle: "목표", headerTitleAlign: "left" }}
        />
        <Drawer.Screen
          name="note/list/[slug]"
          options={{ headerTitle: "", headerTitleAlign: "left" }}
        />
        <Drawer.Screen
          name="note/post/[slug]"
          options={{ headerTitle: "", headerTitleAlign: "left" }}
        />
      </Drawer>
    </AuthProvider>
  )
}
