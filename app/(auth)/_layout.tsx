import { useEffect } from "react"

import useUser from "@/hooks/user/useUser"
import { getStore } from "@/libs/secureStore"
import { Slot, useRouter } from "expo-router"
import * as SecureStore from "expo-secure-store"

const AuthPage = () => {
  const router = useRouter()

  return <Slot />
}

export default AuthPage
