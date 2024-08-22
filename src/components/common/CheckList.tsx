import { useEffect, useState } from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"

import Color from "@/constant/color"
import useNotePostStore from "@/store/useNotePostStore"
import Checkbox from "expo-checkbox"
import { useRouter } from "expo-router"
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
  const router = useRouter()
  const { changeName } = useNotePostStore()

  const [isChecked, setIsChecked] = useState(false)

  const checkPressHanlder = async () => {
    try {
      setDoc(doc(db, "todos", docId), { done: !isChecked }, { merge: true })
      setIsChecked(!isChecked)
    } catch (e) {
      console.log(e)
    }
  }

  const onPressHandler = () => {
    changeName({ todoName: label })
    router.push(`/note/post/${goal_ID}/${docId}`)
  }

  useEffect(() => {
    if (!done) return
    setIsChecked(done)
  }, [done])

  return (
    <View style={styles.listFlex}>
      <Checkbox
        value={isChecked}
        color={isChecked ? Color.blue500 : undefined}
        style={styles.todoListCheckbox}
        onValueChange={checkPressHanlder}
      />
      <Pressable onPress={onPressHandler}>
        <Text style={[styles.listText, isChecked && { textDecorationLine: "line-through" }]}>
          {label}
        </Text>
      </Pressable>
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
