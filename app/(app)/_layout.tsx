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
        <Drawer.Screen name="index" />
        <Drawer.Screen name="alltodo/index" />
        <Drawer.Screen name="goal/[slug]" />
        <Drawer.Screen name="note/list/[slug]" />
        <Drawer.Screen name="note/post/[slug]" />
      </Drawer>
    </AuthProvider>
  )
}
