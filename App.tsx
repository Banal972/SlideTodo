import SideMenu from "@/components/common/SideMenu"
import Color from "@/constant/color"
import LoginScreen from "@/screens/Auth/LoginScreen/LoginScreen"
import SignScreen from "@/screens/Auth/SignScreen/SignScreen"
import DashboardScreen from "@/screens/Dashboard/Dashboard"
import GoalDetail from "@/screens/Goal/GoalDetail"
import AllTodoScreen from "@/screens/Todo/AllTodoScreen"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { NavigationContainer, useRoute } from "@react-navigation/native"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

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

const Drawer = createDrawerNavigator()

const CustomDrawerContent = ({ navigation, state }: any) => {
  if (["Index", "Signup"].includes(state.routeNames[state.index])) {
    return null
  }
  return <SideMenu navigation={navigation} />
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Index"
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={({ route }) => ({
            sceneContainerStyle: {
              backgroundColor: Color.slate100,
            },
            drawerStyle: {
              width: "100%",
            },
            swipeEnabled: !["Index", "Signup"].includes(route.name),
            drawerType: ["Index", "Signup"].includes(route.name) ? "front" : "slide",
          })}
        >
          <Drawer.Screen
            name="Index"
            component={LoginScreen}
            options={{ headerShown: false, drawerItemStyle: { display: "none" } }}
          />
          <Drawer.Screen
            name="Signup"
            component={SignScreen}
            options={{ headerShown: false, drawerItemStyle: { display: "none" } }}
          />
          <Drawer.Screen name="Dashboard" component={DashboardScreen} />
          <Drawer.Screen name="Alltodo" component={AllTodoScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  )
}

export default App
