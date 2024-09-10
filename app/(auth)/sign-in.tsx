import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { TouchableOpacity, View } from "react-native"

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
  const { control, onSumbit } = useSubmit()
  const { pwdInShow, showPwdHandler } = usePwd()

  return (
    <>
      <View className="gap-[25px] mb-12">
        <View style={{ gap: 10 }}>
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
        <View style={{ gap: 10 }}>
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
            <TouchableOpacity className="absolute right-6 top-[10px]" onPress={showPwdHandler}>
              {pwdInShow ? (
                <Ionicons name="eye-off-outline" size={24} color="black" />
              ) : (
                <Ionicons name="eye-outline" size={24} color="black" />
              )}
            </TouchableOpacity>
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

const usePwd = () => {
  const [pwdInShow, setPwdInShow] = useState(true)

  const showPwdHandler = () => {
    setPwdInShow(!pwdInShow)
  }

  return { pwdInShow, showPwdHandler }
}

const useSubmit = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const { control, handleSubmit } = useForm<LoginFormValue>()
  const { mutate } = useLoginMutation(queryClient, router)
  const onSumbit = handleSubmit((data) => mutate(data))

  return { control, onSumbit }
}
