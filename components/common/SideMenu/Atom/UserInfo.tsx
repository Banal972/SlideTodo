import { Alert, Image, ImageBackground, Text, TouchableOpacity, View } from "react-native"

import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/src/types"
import Color from "constant/color"
import ROUTE from "constant/route"
import { useRouter } from "expo-router"
import useUser from "hooks/user/useUser"
import useUserStore from "store/useUserStore"

const UserInfo = ({ navigation }: { navigation: DrawerNavigationHelpers }) => {
  const { user } = useUser()
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

  return (
    <View
      style={{
        paddingTop: 44,
        paddingBottom: 24,
        paddingHorizontal: 16,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Image source={require("@/assets/images/sideMenu/logo.png")} />
        <TouchableOpacity
          onPress={() => {
            navigation.closeDrawer()
          }}
        >
          <Image source={require("@/assets/images/sideMenu/fold.png")} />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginTop: 16,
        }}
      >
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            gap: 8,
          }}
        >
          <View
            style={{
              width: 42,
              height: 42,
              borderRadius: 6,
              backgroundColor: Color.blue50,
              position: "relative",
            }}
          >
            <ImageBackground
              source={require("@/assets/images/userImage.png")}
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
            />
          </View>

          <View>
            <Text
              style={{
                fontSize: 14,
                lineHeight: 16,
                color: Color.slate800,
                fontWeight: "600",
              }}
            >
              {user?.name}
            </Text>
            <Text
              style={{
                fontSize: 14,
                marginTop: 4,
                lineHeight: 16,
                color: Color.slate600,
                fontWeight: "500",
              }}
            >
              {user?.email}
            </Text>
          </View>
        </View>
        <TouchableOpacity>
          <Text
            style={{
              color: Color.slate400,
              fontSize: 16,
              fontWeight: "500",
            }}
            onPress={logoutHandler}
          >
            로그아웃
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default UserInfo
