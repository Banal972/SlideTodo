import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Pressable, StyleSheet, View } from "react-native"

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
  const router = useRouter()
  const { control, handleSubmit } = useForm<SignFormValue>()
  const { mutate } = useSignMutation(router)
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

  const onSubmitHandler = handleSubmit((data) => {
    mutate(data)
  })

  return (
    <>
      <View style={styles.inputContainer}>
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
          <View style={styles.textInputContainer}>
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
            <Pressable style={styles.textInputIcon} onPress={() => showPwdHandler("pwd")}>
              {pwdInShow.pwd ? (
                <Ionicons name="eye-off-outline" size={24} color="black" />
              ) : (
                <Ionicons name="eye-outline" size={24} color="black" />
              )}
            </Pressable>
          </View>
        </View>
        <View>
          <Label>비밀번호 확인</Label>
          <View style={styles.textInputContainer}>
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
            <Pressable style={styles.textInputIcon} onPress={() => showPwdHandler("confirm")}>
              {pwdInShow.confirm ? (
                <Ionicons name="eye-off-outline" size={24} color="black" />
              ) : (
                <Ionicons name="eye-outline" size={24} color="black" />
              )}
            </Pressable>
          </View>
        </View>
      </View>

      <Button label="회원가입" onPress={onSubmitHandler} />

      <BottomLink label="이미 회원이신가요?" linkHref={ROUTE.singnIn} linkLabel="로그인" />
    </>
  )
}

export default SignUpPage

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
