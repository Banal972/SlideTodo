import { SafeAreaView, View } from "react-native"

import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/src/types"
import DashboardTap from "components/common/SideMenu/Atom/DashboardTap"
import GoalInput from "components/common/SideMenu/Atom/GoalInput"
import GoalList from "components/common/SideMenu/Atom/GoalList"
import UserInfo from "components/common/SideMenu/Atom/UserInfo"

const SideMenu = ({ navigation }: { navigation: DrawerNavigationHelpers }) => {
  return (
    <SafeAreaView className="flex-1">
      <UserInfo navigation={navigation} />

      <View>
        <DashboardTap />
        <View className="border border-slate-200 px-4 py-3 border-t-0 border-b-0">
          <GoalInput />
          <GoalList />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default SideMenu
