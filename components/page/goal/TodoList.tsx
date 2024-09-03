import { StyleSheet, View } from "react-native"

import CheckList from "components/common/CheckList"
import NullText from "components/common/NullText"
import { useGetTodos } from "hooks/todo/useGetTodos"

const TodoList = ({ id, goalTitle }: { id: number; goalTitle: string }) => {
  const { data } = useGetTodos({ goalId: id, done: false })

  if (!data) return null

  return data.todos.length > 0 ? (
    <View style={styles.goalView}>
      {data.todos.map((todo) => (
        <CheckList data={todo} key={todo.id} goalTitle={goalTitle} />
      ))}
    </View>
  ) : (
    <NullText>아직 해야할 일이 없어요</NullText>
  )
}

export default TodoList

const styles = StyleSheet.create({
  goalView: {
    flexDirection: "column",
    gap: 8,
    marginTop: 12,
  },
})
