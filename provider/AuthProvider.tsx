import { ReactNode, useEffect, useState } from "react"
import { ActivityIndicator, View } from "react-native"

import Color from "constant/color"
import { Redirect } from "expo-router"
import { getStore } from "libs/secureStore"
import useUserStore from "store/useUserStore"

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { isLoading, isAuthenticated } = useAuthenticated()

  if (isLoading) {
    return (
      <View className="flex-1 justify-center flex-row p-[10px]">
        <ActivityIndicator color={Color.blue500} />
      </View>
    )
  }

  if (!isAuthenticated) return <Redirect href="/sign-in" />

  return children
}

export default AuthProvider

const useAuthenticated = () => {
  const { login, isAuthenticated } = useUserStore()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function checkToken() {
      const token = await getStore("accessToken")
      if (token) {
        await login(token)
      }
      setIsLoading(false)
    }
    checkToken()
  }, [login])

  return { isLoading, isAuthenticated }
}
