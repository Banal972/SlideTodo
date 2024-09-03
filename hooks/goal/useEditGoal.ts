import { Alert } from "react-native"

import { QueryClient, useMutation } from "@tanstack/react-query"
import axiosInstance from "libs/axiosInstance"

const useEditGoal = (
  queryClient: QueryClient,
  setIsEditVisible: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  return useMutation({
    mutationFn: (data: { goalId: number; title: string }) => {
      const { goalId, title } = data
      return axiosInstance.patch(`/goals/${goalId}`, { title })
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["goalList"] }),
        queryClient.invalidateQueries({ queryKey: ["goalDetail"] }),
      ])
      Alert.alert("성공", "수정이 완료 되었습니다.")
      setIsEditVisible(false)
    },
    onError: (error: any) => {
      const { message } = error.response.data
      Alert.alert("실패", message)
    },
  })
}

export default useEditGoal
