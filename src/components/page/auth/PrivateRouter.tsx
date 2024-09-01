import { ReactNode, useEffect, useState } from "react"

import { getStore } from "@/libs/secureStore"
import { Redirect } from "expo-router"

const PrivateRouter = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await getStore("accessToken")
        setToken(!!token)
      } catch (e) {
        console.error("Error checking token:", e)
      } finally {
        setIsLoading(false)
      }
    }

    checkToken()
  }, [])

  if (!isLoading && token) {
    return <Redirect href="/dashboard" />
  }

  return children
}

export default PrivateRouter
