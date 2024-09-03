import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Pressable, View } from "react-native"

import Ionicons from "@expo/vector-icons/Ionicons"
import { useQueryClient } from "@tanstack/react-query"
import Button from "components/common/Button"
import Input from "components/common/Input"
import Label from "components/common/Label"
import BottomLink from "components/page/auth/BottomLink"
import ROUTE from "constant/route"
import { useRouter } from "expo-router"
import useLoginMutation from "hooks/auth/useLoginMutation"
import { LoginFormValue } from "types/auth"

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
      <View className="gap-[25px] mb-12">
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
          <View className="relative">
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
            <Pressable className="absolute right-6 top-[22px]" onPress={showPwdHandler}>
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
