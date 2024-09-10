import { Alert } from "react-native"

import { QueryClient, useMutation } from "@tanstack/react-query"
import { EMAILREG } from "constant/reg"
import ROUTE from "constant/route"
import { Router } from "expo-router"
import axiosInstance from "libs/axiosInstance"
import { saveStore } from "libs/secureStore"
import useUserStore from "store/useUserStore"
import { LoginFormValue } from "types/auth"

const useLoginMutation = (queryClient: QueryClient, router: Router) => {
  const { login } = useUserStore()

  return useMutation({
    mutationFn: async (data: LoginFormValue) => {
      const { email, password } = data

      if (!EMAILREG.test(email)) {
        throw new Error("이메일 형식으로 작성해 주세요")
      }

      return axiosInstance.post(`/auth/login`, {
        email,
        password,
      })
    },
    onSuccess: async (res) => {
      const { accessToken, refreshToken } = res.data
      login(accessToken)
      await saveStore("refreshToken", refreshToken)
      queryClient.invalidateQueries({ queryKey: ["user"] })
      router.push(ROUTE.dashboard)
    },
    onError: (error: any) => {
      const { message } = error.response.data
      Alert.alert("로그인 실패", message)
    },
  })
}

export default useLoginMutation
