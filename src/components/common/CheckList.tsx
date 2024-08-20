import Color from "@/constant/color";
import Checkbox from "expo-checkbox";
import { View, Text, StyleSheet } from "react-native";

const CheckList = ({ done, label }: { done?: boolean; label: string }) => {
  return (
    <View style={styles.listFlex}>
      <Checkbox
        value={done}
        color={done ? Color.blue500 : undefined}
        style={styles.todoListCheckbox}
      />
      <Text
        style={[
          styles.listText,
          done && { textDecorationLine: "line-through" },
        ]}
      >
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  listFlex: {
    flexDirection: "row",
    gap: 8,
  },
  todoListCheckbox: {
    borderColor: Color.slate200,
    borderRadius: 6,
  },
  listText: {
    color: "#1F2937",
    fontSize: 14,
    lineHeight: 20,
  },
});

export default CheckList;
