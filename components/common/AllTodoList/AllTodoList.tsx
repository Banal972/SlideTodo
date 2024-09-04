import { useState } from "react"
import { Image, Modal, Pressable, Text, View } from "react-native"

import Ionicons from "@expo/vector-icons/Ionicons"
import { useQueryClient } from "@tanstack/react-query"
import NoteBottom from "components/common/AllTodoList/NoteBottom"
import Color from "constant/color"
import Checkbox from "expo-checkbox"
import { useRouter } from "expo-router"
import * as WebBrowser from "expo-web-browser"
import useDeleteTodo from "hooks/todo/useDeleteTodo"
import useUpdateTodoDone from "hooks/todo/useUpdateTodoDone"
import useNewTodoModalStore from "store/useNewTodoModalStore"
import usePostNoteStore from "store/usePostNoteStore"
import { TodoType } from "types/todo"

const AllTodoList = ({ todo }: { todo: TodoType }) => {
  const [isModal, setIsModal] = useState(false)
  const queryClient = useQueryClient()
  const router = useRouter()
  const { changeData } = usePostNoteStore()
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

  const { open } = useNewTodoModalStore()

  const closeModal = () => {
    setIsModal(false)
  }

  const { mutate: DeleteMutate } = useDeleteTodo(queryClient, closeModal)

  return (
    <>
      <View>
        <View className="flex-row justify-between">
          <View className="gap-2 flex-row items-center">
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
          <View className="flex-row gap-[10px] items-center">
            {todo.linkUrl && (
              <Pressable onPress={() => handlePressBrowser(todo.linkUrl)}>
                <View className="w-6 h-6 rounded-full bg-blue-100 items-center justify-center">
                  <Image source={require("@/assets/images/icon/link_alt.png")} />
                </View>
              </Pressable>
            )}

            {!todo.noteId && (
              <Pressable
                onPress={() => {
                  changeData({
                    title: todo.goal.title,
                    todoTitle: todo.title,
                  })
                  router.push(`/note/post/${todo.id}`)
                }}
              >
                <View className="w-6 h-6 rounded-full bg-slate-50 items-center justify-center">
                  <Image source={require("@/assets/images/icon/note.png")} />
                </View>
              </Pressable>
            )}

            <Pressable onPress={() => setIsModal(true)}>
              <View className="w-6 h-6 rounded-full bg-slate-50 items-center justify-center">
                <Ionicons name="ellipsis-vertical" size={16} color={Color.slate500} />
              </View>
            </Pressable>
          </View>
        </View>
        {todo.noteId && <NoteBottom noteId={todo.noteId} />}
      </View>

      <Modal visible={isModal} animationType="fade" transparent>
        <View className="items-center justify-center absolute top-0 left-0 w-full h-full bg-black/50" />
        <View className="flex-1 items-center justify-center">
          <View className="bg-white w-[95%] rounded-md overflow-hidden py-8 px-6">
            <View className=" justify-between flex-row">
              <Text className="text-xl font-bold">무슨일 이신가요?</Text>
              <Pressable onPress={() => setIsModal(false)}>
                <Ionicons name="close" size={24} color="black" />
              </Pressable>
            </View>
            <View className="flex flex-row mt-10">
              <Pressable
                onPress={() => {
                  setIsModal(false)
                  open({ todoId: todo.id })
                }}
                className="bg-blue-300 flex-1 items-center justify-center py-3 rounded"
              >
                <Text className="text-base font-medium">수정</Text>
              </Pressable>
              <Pressable
                onPress={() => DeleteMutate(todo.id)}
                className="bg-red-300 flex-1 items-center justify-center py-3 rounded ml-5"
              >
                <Text className="text-base font-medium">삭제</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  )
}

export default AllTodoList
