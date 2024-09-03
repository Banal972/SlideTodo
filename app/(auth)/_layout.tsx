import { Image, View } from "react-native"

import { Slot } from "expo-router"

const AuthPage = () => {
  return (
    <View className="flex-1 justify-center bg-white px-4">
      <View
        style={{
          marginHorizontal: "auto",
          marginBottom: 40,
        }}
      >
        <Image source={require("@/assets/images/logo.png")} />
      </View>
      <Slot />
    </View>
  )
}

export default AuthPage
