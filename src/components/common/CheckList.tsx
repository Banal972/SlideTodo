import Color from "@/constant/color";
import Checkbox from "expo-checkbox";
import { doc, setDoc } from "firebase/firestore";
import { db } from "firebaseConfig";
import { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

const CheckList = ({
  done,
  label,
  docId,
}: {
  done?: boolean;
  label: string;
  docId: string;
}) => {
  const [isChecked, setIsChecked] = useState(done);

  const checkPressHanlder = async () => {
    try {
      setDoc(doc(db, "todos", docId), { done: !isChecked }, { merge: true });
      setIsChecked(!isChecked);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Pressable onPress={checkPressHanlder} style={styles.listFlex}>
      <Checkbox
        value={isChecked}
        color={isChecked ? Color.blue500 : undefined}
        style={styles.todoListCheckbox}
      />
      <Text
        style={[
          styles.listText,
          isChecked && { textDecorationLine: "line-through" },
        ]}
      >
        {label}
      </Text>
    </Pressable>
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
