import { useEffect, useState } from "react"
import { Image, Text } from "react-native"
import { Pressable, View } from "react-native"

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
    <Pressable onPress={() => open({ noteId })}>
      <View className="flex-row ml-6 mt-2">
        <View className="w-5 h-5 rounded-full bg-blue-50 items-center justify-center">
          <Image source={require("@/assets/images/icon/note2.png")} />
        </View>
        <Text className="ml-3">{title}</Text>
      </View>
    </Pressable>
  )
}

export default NoteBottom
