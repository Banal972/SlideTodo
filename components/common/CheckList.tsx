import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native"

import { useQueryClient } from "@tanstack/react-query"
import Color from "constant/color"
import Checkbox from "expo-checkbox"
import { useRouter } from "expo-router"
import useUpdateTodoDone from "hooks/todo/useUpdateTodoDone"
import usePostNoteStore from "store/usePostNoteStore"
import { TodoType } from "types/todo"

const CheckList = ({ data, goalTitle }: { data: TodoType; goalTitle?: string }) => {
  const queryClient = useQueryClient()

  const router = useRouter()

  const { mutate } = useUpdateTodoDone(queryClient, data)
  const { changeData } = usePostNoteStore()

  const checkPressHanlder = () =>
    mutate({
      title: data.title,
      fileUrl: data.fileUrl,
      linkUrl: data.linkUrl,
      goalId: data.goal.id,
      done: !data.done,
    })

  const postNoteHanlder = () => {
    if (data.noteId) {
      return Alert.alert("경고", "이미 노트가 존재합니다.")
    }

    changeData({
      title: goalTitle || "",
      todoTitle: data.title,
    })
    router.push(`/note/post/${data.id}`)
  }

  return (
    <View style={styles.listFlex}>
      <View style={{ flexDirection: "row", gap: 8 }}>
        <Checkbox
          value={data.done}
          color={data.done ? Color.blue500 : undefined}
          style={styles.todoListCheckbox}
          onValueChange={checkPressHanlder}
        />
        <Pressable onPress={postNoteHanlder}>
          <Text style={[styles.listText, data.done && { textDecorationLine: "line-through" }]}>
            {data.title}
          </Text>
        </Pressable>
      </View>

      <View style={{ flexDirection: "row", gap: 10 }}>
        {data.fileUrl && (
          <View
            style={{
              width: 24,
              height: 24,
              borderRadius: 1000,
              backgroundColor: Color.slate50,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image source={require("@/assets/images/icon/ic_uploaded.png")} />
          </View>
        )}

        {data.linkUrl && (
          <View
            style={{
              width: 24,
              height: 24,
              borderRadius: 1000,
              backgroundColor: Color.blue100,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image source={require("@/assets/images/icon/link_alt.png")} />
          </View>
        )}

        {data.noteId && (
          <View
            style={{
              width: 24,
              height: 24,
              borderRadius: 1000,
              backgroundColor: Color.slate50,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image source={require("@/assets/images/icon/note.png")} />
          </View>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  listFlex: {
    flexDirection: "row",

    justifyContent: "space-between",
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
