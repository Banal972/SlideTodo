import { Alert } from "react-native"

import axiosInstance from "@/libs/axiosInstance"
import { QueryClient, useMutation } from "@tanstack/react-query"

const usePostTodo = (queryClient: QueryClient, isModalCloseHandler: () => void) => {
  return useMutation({
    mutationFn: (data: any) => {
      const { title, fileUrl, linkUrl, goalId } = data
      return axiosInstance.post("/todos", {
        title: title,
        fileUrl: fileUrl,
        linkUrl: linkUrl,
        goalId: goalId,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] })
      Alert.alert("성공", "할일을 등록하였습니다.", [
        {
          text: "확인",
          onPress: () => isModalCloseHandler(),
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
