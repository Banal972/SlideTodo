import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Alert, Pressable, StyleSheet, Text, View } from "react-native"

import Ionicons from "@expo/vector-icons/Ionicons"
import Button from "components/common/Button"
import Input from "components/common/Input"
import Label from "components/common/Label"
import Color from "constant/color"
import AuthLayout from "screens/Auth/AuthLayout"

export default function SignScreen({ navigation }: any) {
  const { control, handleSubmit } = useForm()

  const onSubmitHandler = async (data: any) => {
    const { email, password, pwdConfirm } = data

    if (
      !/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(
        email,
      )
    )
      Alert.alert("회원가입 실패", "이메일 형식으로 작성해 주세요")

    if (password !== pwdConfirm) return Alert.alert("회원가입 실패", "서로 비밀번호가 다릅니다.")

    /* try {
      await signup(data)
      Alert.alert("성공", "회원가입에 성공 하였습니다.", [
        {
          text: "확인",
          onPress: () => {
            navigation.navigate("Index")
          },
          style: "default",
        },
      ])
    } catch (error: any) {
      const { message } = error.response.data
      Alert.alert("회원가입 실패", message)
    } */
  }

  const [pwdInShow, setPwdInShow] = useState<{ [key: string]: boolean }>({
    pwd: true,
    confirm: true,
  })

  const showPwdHandler = (key: string) => {
    setPwdInShow((prev) => ({
      ...prev,
      [key]: !pwdInShow[key],
    }))
  }

  return (
    <AuthLayout>
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

      <Button label="회원가입" onPress={handleSubmit(onSubmitHandler)} />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 40,
          justifyContent: "center",
          gap: 4,
        }}
      >
        <Text style={styles.sign}>이미 회원이신가요?</Text>
        <Pressable onPress={() => navigation.navigate("Index")}>
          <Text style={styles.signLink}>로그인</Text>
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
    textAlign: "center",
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
