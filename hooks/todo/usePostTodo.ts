import { UseFormSetValue } from "react-hook-form"
import { Alert } from "react-native"

import { QueryClient, useMutation } from "@tanstack/react-query"
import axiosInstance from "libs/axiosInstance"
import { TodoPostValue } from "types/todo"

const usePostTodo = (
  queryClient: QueryClient,
  isModalCloseHandler: () => void,
  setValue: UseFormSetValue<TodoPostValue>,
) => {
  return useMutation({
    mutationFn: (data: TodoPostValue) => {
      const { title, fileUrl, linkUrl, goalId } = data
      return axiosInstance.post("/todos", {
        title: title,
        fileUrl: fileUrl,
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
      Alert.alert("성공", "할일을 등록하였습니다.", [
        {
          text: "확인",
          onPress: () => {
            setValue("title", "")
            setValue("goalId", 0)
            setValue("linkUrl", "")
            setValue("fileUrl", "")
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

export default usePostTodo
