import { View, StyleSheet, Text } from "react-native";
import BaseContainer from "@/components/common/Container/BaseContainer";
import BaseTitle from "@/components/page/dashboard/common/BaseTitle";
import CheckList from "@/components/common/CheckList";
import useGetTodo from "@/hooks/todo/useGetTodo";
import NullText from "@/components/common/NullText";

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
        linkURL="/todo"
      />
      {todos.length > 0 ? (
        <View style={styles.todoList}>
          {todos.map((todo) => (
            <CheckList
              docId={todo.id}
              done={todo.done}
              key={todo.id}
              label={todo.title}
            />
          ))}
        </View>
      ) : (
        <NullText>최근에 등록한 할 일이 없어요</NullText>
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
