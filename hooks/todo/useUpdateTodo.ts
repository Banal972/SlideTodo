import { UseFormReset } from "react-hook-form"
import { Alert } from "react-native"

import { QueryClient, useMutation } from "@tanstack/react-query"
import axiosInstance from "libs/axiosInstance"
import { IuseUpdateTodo, TodoPostValue } from "types/todo"

const useUpdateTodo = (
  queryClient: QueryClient,
  isModalCloseHandler: () => void,
  reset: UseFormReset<TodoPostValue>,
) => {
  return useMutation({
    mutationFn: (data: IuseUpdateTodo) => {
      const { title, linkUrl, goalId, todoId } = data
      return axiosInstance.patch(`/todos/${todoId}`, {
        title: title,
        linkUrl: linkUrl,
        goalId: goalId,
      })
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["todos"] }),
        queryClient.invalidateQueries({ queryKey: ["goalList"] }),
        queryClient.invalidateQueries({ queryKey: ["progress"] }),
      ])
      Alert.alert("성공", "할일을 수정 하였습니다.", [
        {
          text: "확인",
          onPress: () => {
            isModalCloseHandler()
          },
        },
      ])
      reset()
    },
    onError: (error: any) => {
      const { message } = error.response.data
      Alert.alert("실패", message)
    },
  })
}

export default useUpdateTodo
