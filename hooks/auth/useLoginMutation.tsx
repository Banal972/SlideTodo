import { Alert } from "react-native"

import { QueryClient, useMutation } from "@tanstack/react-query"
import ROUTE from "constant/route"
import { Router } from "expo-router"
import axiosInstance from "libs/axiosInstance"
import useUserStore from "store/useUserStore"
import { LoginFormValue } from "types/auth"

const useLoginMutation = (queryClient: QueryClient, router: Router) => {
  const login = useUserStore((state) => state.login)

  return useMutation({
    mutationFn: async (data: LoginFormValue) => {
      const { email, password } = data

      if (
        !/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(
          email,
        )
      ) {
        throw new Error("이메일 형식으로 작성해 주세요")
      }

      return axiosInstance.post(`/auth/login`, {
        email,
        password,
      })
    },
    onSuccess: (res) => {
      const { accessToken } = res.data
      login(accessToken)
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
