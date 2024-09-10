import { useState } from "react"
import { GestureResponderEvent, Image, Text, TouchableOpacity, View } from "react-native"

import Ionicons from "@expo/vector-icons/Ionicons"
import { useQueryClient } from "@tanstack/react-query"
import BaseContainer from "components/common/Container/BaseContainer"
import Color from "constant/color"
import { useRouter } from "expo-router"
import useDeleteNote from "hooks/note/useDeleteNote"
import { Note } from "hooks/note/useGetNoteList"
import useNoteDetailModalStore from "store/useNoteDetailModalStore"

const NoteContainer = ({ note }: { note: Note }) => {
  const router = useRouter()
  const { open } = useNoteDetailModalStore()

  const openNoteDetail = (id: number) => {
    open({ noteId: id })
  }

  const [isEdit, setIsEdit] = useState(false)

  const { deleteMutate } = useDelete({ setIsEdit })

  const openNotePressHandler = (e: GestureResponderEvent) => {
    e.stopPropagation()
    openNoteDetail(note.id)
  }

  const isEditPressHandler = (e: GestureResponderEvent) => {
    e.stopPropagation()
    setIsEdit(!isEdit)
  }

  const editPressHandler = (e: GestureResponderEvent) => {
    e.stopPropagation()
    router.push(`/note/edit/${note.id}`)
  }
  const deletePressHandler = (e: GestureResponderEvent) => {
    e.stopPropagation()
    deleteMutate(note.id)
  }

  return (
    <TouchableOpacity key={note.id} onPress={openNotePressHandler} className=" relative -z-10">
      <BaseContainer color="white">
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View className="w-7 h-7 rounded-lg items-center justify-center bg-blue-100">
            <Image source={require("@/assets/images/goal/flip.png")} />
          </View>
          <TouchableOpacity onPress={isEditPressHandler}>
            <Ionicons name="ellipsis-vertical" size={24} color={Color.slate400} />
          </TouchableOpacity>
          {isEdit && (
            <View className="absolute w-[106px] right-0 bg-white top-full border rounded-lg border-slate-300 z-50">
              <TouchableOpacity onPress={editPressHandler} className="py-[10]">
                <Text className="text-center">수정하기</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={deletePressHandler}
                className="py-[10px] border-t border-slate-300"
              >
                <Text style={{ textAlign: "center" }}>삭제하기</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <Text className="mt-4 text-lg font-medium text-slate-800">{note.title}</Text>
        <View className="mt-3 pt-3 border-t border-slate-200 w-full relative -z-10">
          <View
            className="flex-row items-center"
            style={{
              gap: 8,
            }}
          >
            <Text className="bg-slate-100 px-[3px] py-[2px] rounded text-xs font-medium">
              To do
            </Text>
            <Text className="text-xs text-slate-700">{note.todo.title}</Text>
          </View>
        </View>
      </BaseContainer>
    </TouchableOpacity>
  )
}

export default NoteContainer

const useDelete = ({ setIsEdit }: { setIsEdit: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const queryClient = useQueryClient()

  const closeIsEditHandler = () => {
    setIsEdit(false)
  }

  const { mutate: deleteMutate } = useDeleteNote(queryClient, closeIsEditHandler)
  return { deleteMutate }
}
