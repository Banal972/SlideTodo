import SideMenu from "@/components/common/SideMenu";
import Color from "@/constant/color";
import { Drawer } from "expo-router/drawer";

const RootLayout = () => {
  return (
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
      <Drawer.Screen
        name="dashboard"
        options={{
          title: "대시보드",
        }}
      />
      <Drawer.Screen name="(auth)" options={{ headerShown: false }} />
      <Drawer.Screen
        name="(todo)/alltodo"
        options={{
          title: "",
        }}
      />
      <Drawer.Screen
        name="(goal)/goal"
        options={{
          title: "목표",
        }}
      />
      <Drawer.Screen
        name="(goal)/goal/[slug]"
        options={{
          title: "목표",
        }}
      />
    </Drawer>
  );
};

export default RootLayout;
