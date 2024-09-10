import { TouchableOpacity } from "react-native"
import { Modal, Text, View } from "react-native"

import Ionicons from "@expo/vector-icons/Ionicons"
import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "expo-router"
import useDeleteNote from "hooks/note/useDeleteNote"

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
            <TouchableOpacity onPress={() => setIsModal(false)}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View className="flex flex-row mt-10">
            <TouchableOpacity
              onPress={() => {
                setIsModal(false)
                router.push(`/note/edit/${noteId}`)
              }}
              className="bg-blue-300 flex-1 items-center justify-center py-3 rounded"
            >
              <Text className="text-base font-medium">수정</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => deleteMutate(noteId)}
              className="bg-red-300 flex-1 items-center justify-center py-3 rounded ml-5"
            >
              <Text className="text-base font-medium">삭제</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default EditModal
