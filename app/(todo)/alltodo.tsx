import CheckList from "@/components/common/CheckList";
import Color from "@/constant/color";
import { todoType } from "@/constant/type";
import useGetTodo from "@/hooks/todo/useGetTodo";
import useNewTodoModalStore from "@/store/useNewTodoModalStore";
import { View, Text, StyleSheet, Pressable } from "react-native";

const Alltodo = () => {
  const { open: openModalHanlder } = useNewTodoModalStore();
  const { type, setType, todos } = useGetTodo({});

  const typePressHanlder = (key: string) => {
    setType(key);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>모든 할 일({todos.length})</Text>
        <Pressable onPress={openModalHanlder}>
          <Text style={styles.titleLink}>+ 할일 추가</Text>
        </Pressable>
      </View>

      <View style={styles.todoContainer}>
        <View style={styles.tagContainer}>
          {todoType.map((types) => (
            <Pressable
              key={types.key}
              style={[
                styles.tagButton,
                type === types.key && styles.tagButtonActive,
              ]}
              onPress={() => typePressHanlder(types.key)}
            >
              <Text
                style={[
                  styles.tagButtonText,
                  type === types.key && { color: "#fff" },
                ]}
              >
                {types.value}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.checkListContainer}>
          {todos.map((todo) => (
            <CheckList done={todo.done} key={todo.id} label={todo.title} />
          ))}
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
