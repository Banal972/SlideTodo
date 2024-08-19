import { View, Text, StyleSheet } from "react-native";
import React from "react";
import BaseContainer from "@/components/page/dashboard/common/BaseContainer";
import BaseTitle from "@/components/page/dashboard/common/BaseTitle";
import CheckList from "@/components/common/CheckList";

const TodoList = () => {
  return (
    <BaseContainer color="white">
      <BaseTitle
        baseIcon={{
          color: "#3B82F6",
          source: require("@/assets/images/dashboard/icon01.png"),
        }}
        title="최근 등록한 일"
        linkURL="/"
      />
      <View style={styles.todoList}>
        <CheckList label="자바스크립트 기초 챕터4 듣기" />
        <CheckList label="자바스크립트 기초 챕터4 듣기" />
        <CheckList label="자바스크립트 기초 챕터4 듣기" />
      </View>
    </BaseContainer>
  );
};

export default TodoList;

const styles = StyleSheet.create({
  todoList: {
    marginTop: 16,
    gap: 8,
  },
});
