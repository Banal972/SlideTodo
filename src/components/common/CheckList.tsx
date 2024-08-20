import { useState } from "react"
import { StyleSheet, View } from "react-native"

import Color from "@/constant/color"
import Checkbox from "expo-checkbox"
import { Link } from "expo-router"
import { doc, setDoc } from "firebase/firestore"
import { db } from "firebaseConfig"

const CheckList = ({
  done,
  label,
  docId,
  goal_ID,
}: {
  done?: boolean
  label: string
  docId: string
  goal_ID: string
}) => {
  const [isChecked, setIsChecked] = useState(done)

  const checkPressHanlder = async () => {
    try {
      setDoc(doc(db, "todos", docId), { done: !isChecked }, { merge: true })
      setIsChecked(!isChecked)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <View style={styles.listFlex}>
      <Checkbox
        value={isChecked}
        color={isChecked ? Color.blue500 : undefined}
        style={styles.todoListCheckbox}
        onValueChange={checkPressHanlder}
      />
      <Link
        href={`/note/post/${goal_ID}`}
        style={[styles.listText, isChecked && { textDecorationLine: "line-through" }]}
      >
        {label}
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  listFlex: {
    flexDirection: "row",
    gap: 8,
  },
  todoListCheckbox: {
    borderColor: Color.slate200,
    borderRadius: 6,
    backgroundColor: "white",
  },
  listText: {
    color: "#1F2937",
    fontSize: 14,
    lineHeight: 20,
  },
})

export default CheckList
