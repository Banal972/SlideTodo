import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Pressable, StyleSheet, View } from "react-native"

import Button from "@/components/common/Button"
import Input from "@/components/common/Input"
import Label from "@/components/common/Label"
import BottomLink from "@/components/page/auth/BottomLink"
import ROUTE from "@/constant/route"
import useLoginMutation from "@/hooks/auth/useLoginMutation"
import { LoginFormValue } from "@/types/auth"
import Ionicons from "@expo/vector-icons/Ionicons"
import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "expo-router"

const SignInPage = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const { control, handleSubmit } = useForm<LoginFormValue>()
  const [pwdInShow, setPwdInShow] = useState(true)

  const { mutate } = useLoginMutation(queryClient, router)
  const onSumbit = handleSubmit((data) => mutate(data))

  const showPwdHandler = () => {
    setPwdInShow(!pwdInShow)
  }

  return (
    <>
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

      <Button label="로그인" onPress={onSumbit} />

      <BottomLink
        label="투두 리스트가 처음이신가요? "
        linkHref={ROUTE.singnUp}
        linkLabel="회원가입"
      />
    </>
  )
}

export default SignInPage

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
})
