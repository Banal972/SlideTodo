import { View, StyleSheet, Text } from "react-native";
import BaseContainer from "@/components/common/Container/BaseContainer";
import BaseTitle from "@/components/page/dashboard/common/BaseTitle";
import CheckList from "@/components/common/CheckList";
import Color from "@/constant/color";
import useGetTodo from "@/hooks/todo/useGetTodo";

const TodoList = () => {
  const { todos } = useGetTodo({});

  return (
    <BaseContainer color="white">
      <BaseTitle
        baseIcon={{
          color: "#3B82F6",
          source: require("@/assets/images/dashboard/icon01.png"),
        }}
        title="최근 등록한 일"
        linkURL="/alltodo"
      />
      {todos.length > 0 ? (
        <View style={styles.todoList}>
          {todos.map((todo) => (
            <CheckList done={todo.done} key={todo.id} label={todo.title} />
          ))}
        </View>
      ) : (
        <Text
          style={{
            textAlign: "center",
            fontSize: 14,
            color: Color.slate500,
            paddingVertical: 60,
          }}
        >
          최근에 등록한 할 일이 없어요
        </Text>
      )}
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
