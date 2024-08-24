import SideMenu from "@/components/common/SideMenu"
import Color from "@/constant/color"
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
  if (["index", "signup/index"].includes(state.routeNames[state.index])) {
    return null
  }
  return <SideMenu navigation={navigation} />
}

export default function RootLayout() {
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
          swipeEnabled: !["index", "signup/index"].includes(route.name),
          drawerType: ["index", "signup/index"].includes(route.name) ? "front" : "slide",
        })}
      >
        <Drawer.Screen
          name="index"
          options={{ headerShown: false, drawerItemStyle: { display: "none" } }}
        />
        <Drawer.Screen
          name="signup/index"
          options={{ headerShown: false, drawerItemStyle: { display: "none" } }}
        />
        <Drawer.Screen name="dashboard/index" />
        <Drawer.Screen name="alltodo/index" />
        <Drawer.Screen name="goal/[slug]" />
        <Drawer.Screen name="note/list/[slug]" />
      </Drawer>
    </QueryClientProvider>
  )
}
