import { Alert } from "react-native"

import axiosInstance from "@/libs/axiosInstance"
import { useMutation } from "@tanstack/react-query"
import { Router } from "expo-router"

const useSignMutation = (router: Router) => {
  return useMutation({
    mutationFn: async (data: any) => {
      const { email, name, password, pwdConfirm } = data

      if (
        !/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(
          email,
        )
      )
        Alert.alert("회원가입 실패", "이메일 형식으로 작성해 주세요")

      if (password !== pwdConfirm) return Alert.alert("회원가입 실패", "서로 비밀번호가 다릅니다.")

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
    onSuccess: (res) => {
      Alert.alert("성공", "회원가입에 성공 하였습니다.", [
        {
          text: "확인",
          onPress: () => {
            router.push("/")
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
