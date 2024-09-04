import { Image, Pressable, Text, View } from "react-native"

import { useQueryClient } from "@tanstack/react-query"
import NoteBottom from "components/common/AllTodoList/NoteBottom"
import Color from "constant/color"
import Checkbox from "expo-checkbox"
import * as WebBrowser from "expo-web-browser"
import useUpdateTodoDone from "hooks/todo/useUpdateTodoDone"
import { TodoType } from "types/todo"

const AllTodoList = ({ todo }: { todo: TodoType }) => {
  const queryClient = useQueryClient()
  const { mutate } = useUpdateTodoDone(queryClient, todo)
  const checkPressHanlder = () =>
    mutate({
      title: todo.title,
      fileUrl: todo.fileUrl,
      linkUrl: todo.linkUrl,
      goalId: todo.goal.id,
      done: !todo.done,
    })

  const handlePressBrowser = async (link: string) => {
    await WebBrowser.openBrowserAsync(link)
  }

  return (
    <View>
      <View className="flex-row justify-between">
        <View className="gap-2 flex-row">
          <Checkbox
            value={todo.done}
            color={todo.done ? Color.blue500 : undefined}
            className="border-slate-200 border rounded-md bg-white"
            onValueChange={checkPressHanlder}
          />
          <Text className={`text-[#1F2937] text-sm leading-5 ${todo.done && "line-through"}`}>
            {todo.title}
          </Text>
        </View>
        <View className="flex-row gap-[10px]">
          {todo.linkUrl && (
            <Pressable onPress={() => handlePressBrowser(todo.linkUrl)}>
              <View className="w-6 h-6 rounded-full bg-blue-100 items-center justify-center">
                <Image source={require("@/assets/images/icon/link_alt.png")} />
              </View>
            </Pressable>
          )}

          {!todo.noteId && (
            <View className="w-6 h-6 rounded-full bg-slate-50 items-center justify-center">
              <Image source={require("@/assets/images/icon/note.png")} />
            </View>
          )}
        </View>
      </View>
      {todo.noteId && <NoteBottom noteId={todo.noteId} />}
    </View>
  )
}

export default AllTodoList
