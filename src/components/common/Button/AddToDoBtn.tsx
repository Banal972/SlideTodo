import Color from "@/constant/color";
import useNewTodoModalStore from "@/store/useNewTodoModalStore";
import { Text, Pressable, StyleSheet } from "react-native";

const AddToDoBtn = () => {
  const { open: openModalHanlder } = useNewTodoModalStore();
  return (
    <Pressable onPress={openModalHanlder}>
      <Text style={styles.text}>+ 할일 추가</Text>
    </Pressable>
  );
};

export default AddToDoBtn;

const styles = StyleSheet.create({
  text: {
    color: Color.blue500,
    fontSize: 14,
    fontWeight: "600",
  },
});
