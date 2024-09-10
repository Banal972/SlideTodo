import { Alert, Image, ImageBackground, Text, TouchableOpacity, View } from "react-native"

import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/src/types"
import ROUTE from "constant/route"
import { useRouter } from "expo-router"
import useUser from "hooks/user/useUser"
import useUserStore from "store/useUserStore"

const UserInfo = ({ navigation }: { navigation: DrawerNavigationHelpers }) => {
  const { user } = useUser()

  const { logoutHandler } = useLogout()

  return (
    <View className="pt-11 pb-6 px-4">
      <View className="flex-row justify-between items-center">
        <Image source={require("@/assets/images/sideMenu/logo.png")} />
        <TouchableOpacity
          onPress={() => {
            navigation.closeDrawer()
          }}
        >
          <Image source={require("@/assets/images/sideMenu/fold.png")} />
        </TouchableOpacity>
      </View>

      <View className="flex-row justify-between items-end mt-4">
        <View
          className="items-center flex-row"
          style={{
            gap: 8,
          }}
        >
          <View className=" w-[42px] h-[42px] rounded-md bg-blue-50 relative">
            <ImageBackground
              source={require("@/assets/images/userImage.png")}
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
            />
          </View>

          <View>
            <Text className="text-sm leading-4 text-slate-800 font-semibold">{user?.name}</Text>
            <Text className="text-sm mt-1 leading-4 text-slate-600 font-medium">{user?.email}</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Text className="text-slate-400 text-base font-medium" onPress={logoutHandler}>
            로그아웃
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default UserInfo

const useLogout = () => {
  const router = useRouter()
  const { logout } = useUserStore()

  const logoutHandler = () => {
    Alert.alert("로그아웃", "정말 로그아웃 하시겠습니까?", [
      {
        text: "네",
        onPress: async () => {
          logout()
          router.push(ROUTE.singnIn)
        },
      },
      {
        text: "아니요",
      },
    ])
  }

  return { logoutHandler }
}
