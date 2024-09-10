import { Alert } from "react-native"

import { QueryClient, useMutation } from "@tanstack/react-query"
import axiosInstance from "libs/axiosInstance"
import { TTodoId } from "types/todo"

const useDeleteTodo = (queryClient: QueryClient, isModalCloseHandler: () => void) => {
  return useMutation({
    mutationFn: (todoId: TTodoId) => {
      return axiosInstance.delete(`/todos/${todoId}`)
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["todos"] }),
        queryClient.invalidateQueries({ queryKey: ["goalList"] }),
        queryClient.invalidateQueries({ queryKey: ["progress"] }),
      ])
      Alert.alert("성공", "할일을 삭제 하였습니다.", [
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

export default useDeleteTodo
