import { useEffect, useState } from "react"
import { Image, Text } from "react-native"
import { Pressable, View } from "react-native"

import Ionicons from "@expo/vector-icons/Ionicons"
import Color from "constant/color"
import axiosInstance from "libs/axiosInstance"
import useNoteDetailModalStore from "store/useNoteDetailModalStore"

const NoteBottom = ({ noteId }: { noteId: number }) => {
  const [title, setTitle] = useState("")

  const { open } = useNoteDetailModalStore()

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axiosInstance.get(`/notes/${noteId}`)
        setTitle(response.data.title)
      } catch (e: any) {
        const { message } = e.response.data
        throw new Error(message)
      }
    }

    fetch()
  }, [noteId])

  return (
    <View className="flex justify-between flex-row mt-2 items-center">
      <Pressable onPress={() => open({ noteId })}>
        <View className="flex-row ml-6 mt-2 items-center">
          <View className="w-5 h-5 rounded-full bg-blue-50 items-center justify-center">
            <Image source={require("@/assets/images/icon/note2.png")} />
          </View>
          <Text className="ml-3">{title}</Text>
        </View>
      </Pressable>

      <Pressable>
        <View className="w-6 h-6 rounded-full bg-slate-50 items-center justify-center">
          <Ionicons name="ellipsis-vertical" size={16} color={Color.slate500} />
        </View>
      </Pressable>
    </View>
  )
}

export default NoteBottom
