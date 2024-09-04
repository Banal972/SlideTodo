import { useEffect, useState } from "react"
import { Image, Modal, Text } from "react-native"
import { Pressable, View } from "react-native"

import Ionicons from "@expo/vector-icons/Ionicons"
import { useQueryClient } from "@tanstack/react-query"
import Color from "constant/color"
import { useRouter } from "expo-router"
import useDeleteNote from "hooks/note/useDeleteNote"
import useGetTodoNote from "hooks/todo/useGetTodoNote"
import axiosInstance from "libs/axiosInstance"
import useNoteDetailModalStore from "store/useNoteDetailModalStore"

const NoteBottom = ({ noteId }: { noteId: number }) => {
  const [isModal, setIsModal] = useState(false)

  const { open } = useNoteDetailModalStore()

  const { data: title } = useGetTodoNote({ noteId })

  return (
    <>
      <View className="flex justify-between flex-row mt-2 items-center">
        <Pressable onPress={() => open({ noteId })}>
          <View className="flex-row ml-6 mt-2 items-center">
            <View className="w-5 h-5 rounded-full bg-blue-50 items-center justify-center">
              <Image source={require("@/assets/images/icon/note2.png")} />
            </View>
            <Text className="ml-3">{title}</Text>
          </View>
        </Pressable>

        <Pressable onPress={() => setIsModal(true)}>
          <View className="w-6 h-6 rounded-full bg-slate-50 items-center justify-center">
            <Ionicons name="ellipsis-vertical" size={16} color={Color.slate500} />
          </View>
        </Pressable>
      </View>
      <EditModal isModal={isModal} setIsModal={setIsModal} noteId={noteId} />
    </>
  )
}

export default NoteBottom

const EditModal = ({ isModal, setIsModal, noteId }: any) => {
  const router = useRouter()

  const queryClient = useQueryClient()
  const { mutate: deleteMutate } = useDeleteNote(queryClient, setIsModal)

  return (
    <Modal visible={isModal} animationType="fade" transparent>
      <View className="items-center justify-center absolute top-0 left-0 w-full h-full bg-black/50" />
      <View className="flex-1 items-center justify-center">
        <View className="bg-white w-[95%] rounded-md overflow-hidden py-8 px-6">
          <View className=" justify-between flex-row">
            <Text className="text-xl font-bold">노트 - 무슨일 이신가요?</Text>
            <Pressable onPress={() => setIsModal(false)}>
              <Ionicons name="close" size={24} color="black" />
            </Pressable>
          </View>
          <View className="flex flex-row mt-10">
            <Pressable
              onPress={() => {
                setIsModal(false)
                router.push(`/note/edit/${noteId}`)
              }}
              className="bg-blue-300 flex-1 items-center justify-center py-3 rounded"
            >
              <Text className="text-base font-medium">수정</Text>
            </Pressable>
            <Pressable
              onPress={() => deleteMutate(noteId)}
              className="bg-red-300 flex-1 items-center justify-center py-3 rounded ml-5"
            >
              <Text className="text-base font-medium">삭제</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  )
}
