import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Label from "@/components/common/Label";
import { Link } from "expo-router";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import Color from "@/constant/color";

export default function HomeScreen() {
  const [pwdInShow, setPwdInShow] = useState<{ [key: string]: boolean }>({
    pwd: true,
    confirm: true,
  });

  const showPwdHandler = (key: string) => {
    setPwdInShow((prev) => ({
      ...prev,
      [key]: !pwdInShow[key],
    }));
  };

  return (
    <>
      <View style={styles.inputContainer}>
        <View>
          <Label>아이디</Label>
          <Input placeholder="이름을 입력해주세요" />
        </View>
        <View>
          <Label>이메일</Label>
          <Input placeholder="이메일을 입력해주세요" />
        </View>
        <View>
          <Label>비밀번호</Label>
          <View style={styles.textInputContainer}>
            <Input
              secureTextEntry={pwdInShow.pwd}
              placeholder="비밀번호를 입력해주세요"
            />
            <Pressable
              style={styles.textInputIcon}
              onPress={() => showPwdHandler("pwd")}
            >
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
            <Input
              secureTextEntry={pwdInShow.confirm}
              placeholder="비밀번호를 다시 한 번 입력해주세요."
            />
            <Pressable
              style={styles.textInputIcon}
              onPress={() => showPwdHandler("confirm")}
            >
              {pwdInShow.confirm ? (
                <Ionicons name="eye-off-outline" size={24} color="black" />
              ) : (
                <Ionicons name="eye-outline" size={24} color="black" />
              )}
            </Pressable>
          </View>
        </View>
      </View>

      <Button label="회원가입" />

      <Text style={styles.sign}>
        이미 회원이신가요?{" "}
        <Link style={styles.signLink} href={"/"}>
          로그인
        </Link>{" "}
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
