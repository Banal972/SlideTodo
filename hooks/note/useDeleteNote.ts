import { Alert } from "react-native"

import { QueryClient, useMutation } from "@tanstack/react-query"
import axiosInstance from "libs/axiosInstance"

const useDeleteNote = (queryClient: QueryClient, isModalCloseHandler: () => void) => {
  return useMutation({
    mutationFn: (noteId: number) => {
      return axiosInstance.delete(`/notes/${noteId}`)
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["todos"] }),
        queryClient.invalidateQueries({ queryKey: ["notes"] }),
      ])
      Alert.alert("성공", "노트를 삭제 하였습니다.", [
        {
          text: "확인",
          onPress: () => {
            isModalCloseHandler()
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

export default useDeleteNote
