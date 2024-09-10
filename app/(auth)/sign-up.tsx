import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { TouchableOpacity, View } from "react-native"

import Ionicons from "@expo/vector-icons/Ionicons"
import Button from "components/common/Button"
import Input from "components/common/Input"
import Label from "components/common/Label"
import BottomLink from "components/page/auth/BottomLink"
import ROUTE from "constant/route"
import { useRouter } from "expo-router"
import useSignMutation from "hooks/auth/useSignMutation"
import { SignFormValue, pwdInShowState } from "types/auth"

const SignUpPage = () => {
  const { onSubmitHandler, control } = useSumbit()
  const { showPwdHandler, pwdInShow } = usePwd()

  return (
    <>
      <View className="gap-[25px] mb-12">
        <View>
          <Label>이름</Label>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="이름을 입력해주세요"
              />
            )}
          />
        </View>
        <View>
          <Label>이메일</Label>
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
                  secureTextEntry={pwdInShow.pwd}
                  placeholder="비밀번호를 입력해주세요"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="password"
            />
            <TouchableOpacity
              className="absolute right-6 top-[22px]"
              onPress={() => showPwdHandler("pwd")}
            >
              {pwdInShow.pwd ? (
                <Ionicons name="eye-off-outline" size={24} color="black" />
              ) : (
                <Ionicons name="eye-outline" size={24} color="black" />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Label>비밀번호 확인</Label>
          <View className="relative">
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  secureTextEntry={pwdInShow.confirm}
                  placeholder="비밀번호를 다시 한 번 입력해주세요."
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="pwdConfirm"
            />
            <TouchableOpacity
              className="absolute right-6 top-[22px]"
              onPress={() => showPwdHandler("confirm")}
            >
              {pwdInShow.confirm ? (
                <Ionicons name="eye-off-outline" size={24} color="black" />
              ) : (
                <Ionicons name="eye-outline" size={24} color="black" />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Button label="회원가입" onPress={onSubmitHandler} />
      <BottomLink label="이미 회원이신가요?" linkHref={ROUTE.singnIn} linkLabel="로그인" />
    </>
  )
}

export default SignUpPage

const usePwd = () => {
  const [pwdInShow, setPwdInShow] = useState<pwdInShowState>({
    pwd: true,
    confirm: true,
  })

  const showPwdHandler = (key: string) => {
    setPwdInShow((prev) => ({
      ...prev,
      [key]: !pwdInShow[key],
    }))
  }

  return { showPwdHandler, pwdInShow }
}

const useSumbit = () => {
  const router = useRouter()
  const { control, handleSubmit } = useForm<SignFormValue>()
  const { mutate } = useSignMutation(router)
  const onSubmitHandler = handleSubmit((data) => {
    mutate(data)
  })

  return { onSubmitHandler, control }
}
