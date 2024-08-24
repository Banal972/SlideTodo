import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Alert, Pressable, StyleSheet, Text, View } from "react-native"

import Button from "@/components/common/Button"
import Input from "@/components/common/Input"
import Label from "@/components/common/Label"
import Color from "@/constant/color"
import axiosInstance from "@/libs/axiosInstance"
import { saveStore } from "@/libs/secureStore"
import AuthLayout from "@/screens/Auth/AuthLayout"
import Ionicons from "@expo/vector-icons/Ionicons"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export default function LoginScreen({ navigation }: any) {
  const { control, handleSubmit } = useForm()
  const [pwdInShow, setPwdInShow] = useState(true)

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: async (data: any) => {
      const { email, password } = data

      if (
        !/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(
          email,
        )
      ) {
        Alert.alert("로그인 실패", "이메일 형식으로 작성해 주세요")
      }

      return axiosInstance.post(`/auth/login`, {
        email,
        password,
      })
    },
    onSuccess: (res) => {
      const { accessToken } = res.data
      saveStore("accessToken", accessToken)
      queryClient.invalidateQueries({ queryKey: ["user"] })
      navigation.navigate("Dashboard")
    },
    onError: (error: any) => {
      const { message } = error.response.data
      Alert.alert("로그인 실패", message)
    },
  })

  const onSumbit = (data: any) => {
    mutate(data)
  }

  const showPwdHandler = () => {
    setPwdInShow(!pwdInShow)
  }

  return (
    <AuthLayout>
      <View style={styles.inputContainer}>
        <View>
          <Label>아이디</Label>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="이메일을 입력해주세요"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="email"
          />
        </View>
        <View>
          <Label>비밀번호</Label>
          <View style={styles.textInputContainer}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  secureTextEntry={pwdInShow}
                  placeholder="비밀번호를 입력해주세요"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="password"
            />
            <Pressable style={styles.textInputIcon} onPress={showPwdHandler}>
              {pwdInShow ? (
                <Ionicons name="eye-off-outline" size={24} color="black" />
              ) : (
                <Ionicons name="eye-outline" size={24} color="black" />
              )}
            </Pressable>
          </View>
        </View>
      </View>

      <Button label="로그인" onPress={handleSubmit(onSumbit)} />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 40,
          justifyContent: "center",
          gap: 4,
        }}
      >
        <Text style={styles.sign}>투두 리스트가 처음이신가요? </Text>
        <Pressable onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.signLink}>회원가입</Text>
        </Pressable>
      </View>
    </AuthLayout>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    gap: 25,
    marginBottom: 48,
  },
  textInputIcon: {
    position: "absolute",
    right: 24,
    top: 22,
  },
  textInputContainer: {
    position: "relative",
  },
  sign: {
    color: Color.slate800,
    fontSize: 14,
    fontWeight: "medium",
  },
  signLink: {
    color: "#3182F6",
    fontWeight: "medium",
    fontSize: 14,
  },
})
