import { Image, View } from "react-native"

import { Slot } from "expo-router"

const AuthPage = () => {
  return (
    <View className="flex-1 justify-center bg-white px-4">
      <View className="mb-20 mx-auto">
        <Image source={require("@/assets/images/logo.png")} />
      </View>
      <Slot />
    </View>
  )
}

export default AuthPage
