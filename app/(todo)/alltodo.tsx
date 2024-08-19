import CheckList from "@/components/common/CheckList";
import Color from "@/constant/color";
import { Link } from "expo-router";
import { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

const Alltodo = () => {
  const [type, setType] = useState("");

  const typePressHanlder = (type: string) => {
    setType(type);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>모든 할 일(6)</Text>
        <Link style={styles.titleLink} href={"/"}>
          + 할일 추가
        </Link>
      </View>

      <View style={styles.todoContainer}>
        <View style={styles.tagContainer}>
          <Pressable
            style={[styles.tagButton, type === "" && styles.tagButtonActive]}
            onPress={() => typePressHanlder("")}
          >
            <Text
              style={[styles.tagButtonText, type === "" && { color: "#fff" }]}
            >
              All
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.tagButton,
              type === "todo" && styles.tagButtonActive,
            ]}
            onPress={() => typePressHanlder("todo")}
          >
            <Text
              style={[
                styles.tagButtonText,
                type === "todo" && { color: "#fff" },
              ]}
            >
              To do
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.tagButton,
              type === "done" && styles.tagButtonActive,
            ]}
            onPress={() => typePressHanlder("done")}
          >
            <Text
              style={[
                styles.tagButtonText,
                type === "done" && { color: "#fff" },
              ]}
            >
              Done
            </Text>
          </Pressable>
        </View>

        <View style={styles.checkListContainer}>
          <CheckList label="자바스크립트 기초 챕터4 듣기" />
          <CheckList label="자바스크립트 기초 챕터4 듣기" />
          <CheckList label="자바스크립트 기초 챕터4 듣기" />
          <CheckList label="자바스크립트 기초 챕터4 듣기" />
          <CheckList label="자바스크립트 기초 챕터4 듣기" />
          <CheckList label="자바스크립트 기초 챕터4 듣기" />
          <CheckList label="자바스크립트 기초 챕터4 듣기" />
        </View>
      </View>
    </View>
  );
};

export default Alltodo;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: Color.slate900,
  },
  titleLink: {
    fontSize: 14,
    fontWeight: "600",
    color: Color.blue500,
  },
  todoContainer: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: Color.slate100,
    borderRadius: 12,
    marginTop: 16,
    padding: 16,
  },
  tagContainer: {
    flexDirection: "row",
    gap: 8,
  },
  tagButtonActive: {
    backgroundColor: Color.blue500,
    borderColor: Color.blue500,
  },
  tagButton: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: Color.slate200,
  },
  tagButtonText: {
    color: Color.slate800,
    fontSize: 14,
    fontWeight: "500",
  },
  checkListContainer: {
    marginTop: 16,
    gap: 8,
  },
});
