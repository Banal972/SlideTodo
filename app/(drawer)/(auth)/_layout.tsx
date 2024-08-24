import { useEffect } from "react"
import { Image, StyleSheet, View } from "react-native"

import useGetUser from "@/hooks/useGetUser"
import { Slot, useRouter } from "expo-router"

const AuthLayout = () => {
  const { user } = useGetUser()
  const router = useRouter()

  useEffect(() => {
    if (user) router.push("/dashboard")
  }, [user])

  return (
    <View style={styles.container}>
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

export default AuthLayout

const styles = StyleSheet.create({
  logo: {
    fontSize: 48,
    textAlign: "center",
    fontWeight: "black",
    marginBottom: 24,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
    paddingHorizontal: 16,
  },
})
