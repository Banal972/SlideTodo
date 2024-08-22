import { StyleSheet, View } from "react-native"

import CheckList from "@/components/common/CheckList"
import BaseContainer from "@/components/common/Container/BaseContainer"
import NullText from "@/components/common/NullText"
import BaseTitle from "@/components/page/dashboard/common/BaseTitle"
import useGetTodo from "@/hooks/todo/useGetTodo"

const TodoList = () => {
  const { todos } = useGetTodo({ lmt: 10 })
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
              goal_ID={todo.goal_ID}
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
  )
}

export default TodoList

const styles = StyleSheet.create({
  todoList: {
    marginTop: 16,
    gap: 8,
  },
})
