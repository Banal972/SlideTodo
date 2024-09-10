import { useState } from "react"
import { Image, Text, TouchableOpacity } from "react-native"
import { View } from "react-native"

import Ionicons from "@expo/vector-icons/Ionicons"
import EditModal from "components/page/note/EditModal"
import Color from "constant/color"
import useGetTodoNote from "hooks/todo/useGetTodoNote"
import useNoteDetailModalStore from "store/useNoteDetailModalStore"
import { TNoteId } from "types/note"

const NoteBottom = ({ noteId }: TNoteId) => {
  const [isModal, setIsModal] = useState(false)

  const { open } = useNoteDetailModalStore()

  const { data: title } = useGetTodoNote({ noteId })

  return (
    <>
      <View className="flex justify-between flex-row mt-2 items-center">
        <TouchableOpacity onPress={() => open({ noteId })}>
          <View className="flex-row ml-6 mt-2 items-center">
            <View className="w-5 h-5 rounded-full bg-blue-50 items-center justify-center">
              <Image source={require("@/assets/images/icon/note2.png")} />
            </View>
            <Text className="ml-3">{title}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setIsModal(true)}>
          <View className="w-6 h-6 rounded-full bg-slate-50 items-center justify-center">
            <Ionicons name="ellipsis-vertical" size={16} color={Color.slate500} />
          </View>
        </TouchableOpacity>
      </View>
      <EditModal isModal={isModal} setIsModal={setIsModal} noteId={noteId} />
    </>
  )
}

export default NoteBottom
