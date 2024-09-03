import { StyleSheet, View } from "react-native"

import CheckList from "components/common/CheckList"
import NullText from "components/common/NullText"
import { useGetTodos } from "hooks/todo/useGetTodos"

const TodoDoneList = ({ id, goalTitle }: { id: number; goalTitle: string }) => {
  const { data } = useGetTodos({ goalId: id, done: true })

  if (!data) return null

  return data.todos.length > 0 ? (
    <View style={styles.goalView}>
      {data.todos.map((todo) => (
        <CheckList key={todo.id} data={todo} goalTitle={goalTitle} />
      ))}
    </View>
  ) : (
    <NullText>다 한 일이 아직 없어요</NullText>
  )
}

export default TodoDoneList

const styles = StyleSheet.create({
  goalView: {
    flexDirection: "column",
    gap: 8,
    marginTop: 12,
  },
})
