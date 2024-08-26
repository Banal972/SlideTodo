import { SafeAreaView, View } from "react-native"

import DashboardTap from "@/components/common/SideMenu/Atom/DashboardTap"
import GoalInput from "@/components/common/SideMenu/Atom/GoalInput"
import GoalList from "@/components/common/SideMenu/Atom/GoalList"
import UserInfo from "@/components/common/SideMenu/Atom/UserInfo"
import Color from "@/constant/color"
import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/src/types"

const SideMenu = ({ navigation }: { navigation: DrawerNavigationHelpers }) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <UserInfo navigation={navigation} />

      <View>
        <DashboardTap />
        <View
          style={{
            borderWidth: 1,
            borderColor: Color.slate200,
            paddingHorizontal: 16,
            paddingVertical: 12,
            borderTopWidth: 0,
            borderBottomWidth: 0,
          }}
        >
          <GoalInput />
          <GoalList />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default SideMenu
