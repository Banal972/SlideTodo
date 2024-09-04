import { Alert } from "react-native"

import { QueryClient, useMutation } from "@tanstack/react-query"
import { Router } from "expo-router"
import axiosInstance from "libs/axiosInstance"

const useUpdateNote = (queryClient: QueryClient, router: Router) => {
  return useMutation({
    mutationFn: (data: { title: string; content: string; linkUrl: string; noteId: number }) => {
      const { title, content, linkUrl, noteId } = data
      return axiosInstance.patch(`/notes/${noteId}`, {
        title,
        content,
        linkUrl,
      })
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["todoNote"] }),
        queryClient.invalidateQueries({ queryKey: ["noteDetail"] }),
        queryClient.invalidateQueries({ queryKey: ["notes"] }),
      ])
      Alert.alert("성공", "노트를 수정했습니다.", [
        {
          text: "확인",
          onPress: () => {
            router.back()
          },
        },
      ])
    },
    onError: (error: any) => {
      const { message } = error.response.data
      Alert.alert("실패", message)
    },
  })
}

export default useUpdateNote
