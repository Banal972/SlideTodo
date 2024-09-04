import { ReactNode, useEffect } from "react"

import { Redirect } from "expo-router"
import { getStore } from "libs/secureStore"
import useUserStore from "store/useUserStore"

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const login = useUserStore((state) => state.login)
  const isAuthenticated = useUserStore((state) => state.isAuthenticated)

  useEffect(() => {
    async function checkToken() {
      const token = await getStore("accessToken")
      if (token) {
        login(token)
      }
    }
    checkToken()
  }, [])

  if (!isAuthenticated) return <Redirect href="/sign-in" />

  return children
}

export default AuthProvider
