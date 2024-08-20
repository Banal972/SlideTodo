import { Link, useRouter } from "expo-router";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import Color from "../../src/constant/color";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import Label from "@/components/common/Label";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { useForm, Controller } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "firebaseConfig";
import useUserStore from "@/store/useUserStore";

export default function HomeScreen() {
  const { login } = useUserStore();
  const router = useRouter();
  const { control, handleSubmit } = useForm();
  const [pwdInShow, setPwdInShow] = useState(true);

  const onSubmitHandler = (data: any) => {
    const { email, password } = data;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        login(user);
        router.push("/dashboard");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const showPwdHandler = () => {
    setPwdInShow(!pwdInShow);
  };

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

      <Button label="로그인" onPress={handleSubmit(onSubmitHandler)} />

      <Text style={styles.sign}>
        투두 리스트가 처음이신가요?{" "}
        <Link style={styles.signLink} href={"/sign"}>
          회원가입
        </Link>
      </Text>
    </>
  );
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
    marginTop: 40,
    textAlign: "center",
    color: Color.slate800,
    fontSize: 14,
    fontWeight: "medium",
  },
  signLink: {
    color: "#3182F6",
    fontWeight: "medium",
    fontSize: 14,
    paddingBottom: 2,
  },
});
