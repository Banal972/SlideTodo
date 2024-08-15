import { Link } from "expo-router";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import Color from "../../constant/color";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";

export default function HomeScreen() {
  const [pwdInShow, setPwdInShow] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.testLogo}>로고</Text>

      <View style={styles.inputContainer}>
        <View>
          <Text style={styles.textInputLabel}>아이디</Text>
          <TextInput
            style={styles.textInput}
            placeholder="이메일을 입력해주세요"
          />
        </View>
        <View>
          <Text style={styles.textInputLabel}>비밀번호</Text>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              secureTextEntry
              placeholder="이메일을 입력해주세요"
            />
            <View style={styles.textInputIcon}>
              {pwdInShow ? (
                <Ionicons name="eye-off-outline" size={24} color="black" />
              ) : (
                <Ionicons name="eye-outline" size={24} color="black" />
              )}
            </View>
          </View>
        </View>
      </View>

      <Pressable>
        <View style={styles.button}>
          <Text style={styles.buttonText}>로그인하기</Text>
        </View>
      </Pressable>

      <Text style={styles.sign}>
        투두 리스트가 처음이신가요?{" "}
        <Link style={styles.signLink} href={"/sign"}>
          회원가입
        </Link>{" "}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  testLogo: {
    fontSize: 48,
    textAlign: "center",
    fontWeight: "black",
    marginBottom: 24,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
    paddingHorizontal: 16,
  },
  inputContainer: {
    gap: 25,
  },
  textInputLabel: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "bold",
  },
  textInputIcon: {
    position: "absolute",
    right: 24,
    top: 22,
  },
  textInputContainer: {
    position: "relative",
  },
  textInput: {
    backgroundColor: Color.slate50,
    marginTop: 12,
    fontSize: 14,
    lineHeight: 20,
    height: 44,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  button: {
    backgroundColor: Color.slate400,
    marginTop: 48,
    borderRadius: 12,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "semibold",
    lineHeight: 24,
    color: "white",
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
