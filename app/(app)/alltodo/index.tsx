import { useState } from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"

import AddToDoBtn from "components/common/Button/AddToDoBtn"
import CheckList from "components/common/CheckList"
import Color from "constant/color"
import { todoType } from "constant/type"
import { useGetTodos } from "hooks/todo/useGetTodos"

const AllTodoPage = () => {
  const [type, setType] = useState<boolean | null>(null)
  const { data } = useGetTodos({ done: type })

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>모든 할 일({data?.todos.length || 0})</Text>
        <AddToDoBtn />
      </View>

      <View style={styles.todoContainer}>
        <View style={styles.tagContainer}>
          {todoType.map((types, index) => (
            <Pressable
              key={index + 1}
              style={[styles.tagButton, type === types.key && styles.tagButtonActive]}
              onPress={() => setType(types.key)}
            >
              <Text style={[styles.tagButtonText, type === types.key && { color: "#fff" }]}>
                {types.value}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.checkListContainer}>
          {data && data.todos.map((todo) => <CheckList key={todo.id} data={todo} />)}
        </View>
      </View>
    </View>
  )
}

export default AllTodoPage

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
})
