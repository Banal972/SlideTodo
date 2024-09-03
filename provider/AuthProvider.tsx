import { ReactNode, useEffect } from "react"

import { getStore } from "libs/secureStore"
import useUserStore from "store/useUserStore"

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { signIn } = useUserStore()

  useEffect(() => {
    const checkToken = async () => {
      const token = await getStore("accessToken")
      if (token) signIn()
    }
    checkToken()
  }, [])

  return children
}

export default AuthProvider
