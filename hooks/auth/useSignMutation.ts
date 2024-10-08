import { Alert } from "react-native"

import { useMutation } from "@tanstack/react-query"
import { EMAILREG } from "constant/reg"
import ROUTE from "constant/route"
import { Router } from "expo-router"
import axiosInstance from "libs/axiosInstance"
import { SignFormValue } from "types/auth"

const useSignMutation = (router: Router) => {
  return useMutation({
    mutationFn: async (data: SignFormValue) => {
      const { email, name, password, pwdConfirm } = data

      if (!EMAILREG.test(email)) {
        throw new Error("이메일 형식으로 작성해 주세요")
      }

      if (password !== pwdConfirm) {
        throw new Error("서로 비밀번호가 다릅니다.")
      }

      return axiosInstance.post(
        "/user",
        {
          email,
          name,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
    },
    onSuccess: () => {
      Alert.alert("성공", "회원가입에 성공 하였습니다.", [
        {
          text: "확인",
          onPress: () => {
            router.push(ROUTE.singnIn)
          },
          style: "default",
        },
      ])
    },
    onError: (error: any) => {
      const { message } = error.response.data
      Alert.alert("회원가입 실패", message)
    },
  })
}

export default useSignMutation
