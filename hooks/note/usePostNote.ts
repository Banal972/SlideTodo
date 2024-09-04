import { Alert } from "react-native"

import { QueryClient, useMutation } from "@tanstack/react-query"
import { Router } from "expo-router"
import axiosInstance from "libs/axiosInstance"

const usePostNote = (queryClient: QueryClient, router: Router) => {
  return useMutation({
    mutationFn: (data: { todoId: number; title: string; content: string; linkUrl: string }) => {
      const { todoId, title, content, linkUrl } = data
      return axiosInstance.post("/notes", {
        todoId,
        title,
        content,
        linkUrl,
      })
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["todos"] }),
        queryClient.invalidateQueries({ queryKey: ["notes"] }),
        queryClient.invalidateQueries({ queryKey: ["goalList"] }),
      ])
      Alert.alert("성공", "노트를 작성했습니다.", [
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

export default usePostNote
