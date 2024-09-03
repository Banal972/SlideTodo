import { Alert, Image, Pressable, Text, View } from "react-native"

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
    <View className="flex-row justify-between">
      <View className="gap-2 flex-row">
        <Checkbox
          value={data.done}
          color={data.done ? Color.blue500 : undefined}
          className="border-slate-200 border rounded-md bg-white"
          onValueChange={checkPressHanlder}
        />
        <Pressable onPress={postNoteHanlder}>
          <Text className={`text-[#1F2937] text-sm leading-5 ${data.done && "line-through"}`}>
            {data.title}
          </Text>
        </Pressable>
      </View>

      <View className="flex-row gap-[10px]">
        {data.fileUrl && (
          <View className="w-6 h-6 rounded-full bg-slate-50 items-center justify-center">
            <Image source={require("@/assets/images/icon/ic_uploaded.png")} />
          </View>
        )}

        {data.linkUrl && (
          <View className="w-6 h-6 rounded-full bg-blue-100 items-center justify-center">
            <Image source={require("@/assets/images/icon/link_alt.png")} />
          </View>
        )}

        {data.noteId && (
          <View className="w-6 h-6 rounded-full bg-slate-50 items-center justify-center">
            <Image source={require("@/assets/images/icon/note.png")} />
          </View>
        )}
      </View>
    </View>
  )
}

export default CheckList
