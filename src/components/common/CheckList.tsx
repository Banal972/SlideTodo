import Color from "@/constant/color";
import Checkbox from "expo-checkbox";
import { View, Text, StyleSheet } from "react-native";

const CheckList = ({ label }: { label: string }) => {
  return (
    <View style={styles.listFlex}>
      <Checkbox style={styles.todoListCheckbox} />
      <Text>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  listFlex: {
    flexDirection: "row",
    gap: 8,
    color: "#1F2937",
    fontSize: 14,
    lineHeight: 20,
  },
  todoListCheckbox: {
    borderColor: Color.slate200,
    borderRadius: 6,
  },
});

export default CheckList;
