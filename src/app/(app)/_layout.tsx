import SideMenu from "@/components/common/SideMenu/SideMenu"
import Color from "@/constant/color"
import ROUTE from "@/constant/route"
import useUserStore from "@/store/useUserStore"
import { Redirect } from "expo-router"
import { Drawer } from "expo-router/drawer"

export default function AppLayout() {
  const { token } = useUserStore()

  if (!token) {
    return <Redirect href={ROUTE.singnIn} />
  }

  return (
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
  )
}

/* 

const CustomDrawerContent = ({ navigation, state }: any) => {
  if (["sign-in", "sign-up"].includes(state.routeNames[state.index])) {
    return null
  }
  return <SideMenu navigation={navigation} />
}
drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({ route }) => ({
        sceneContainerStyle: {
          backgroundColor: Color.slate100,
        },
        drawerStyle: {
          width: "100%",
        },
        swipeEnabled: !["sign-in", "sign-up"].includes(route.name),
        drawerType: ["sign-in", "sign-up"].includes(route.name) ? "front" : "slide",
      })}
*/
