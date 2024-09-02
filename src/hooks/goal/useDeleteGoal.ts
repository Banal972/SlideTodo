import { Alert } from "react-native"

import ROUTE from "@/constant/route"
import axiosInstance from "@/libs/axiosInstance"
import { QueryClient, useMutation } from "@tanstack/react-query"
import { Router } from "expo-router"

const useDeleteGoal = (queryClient: QueryClient, router: Router) => {
  return useMutation({
    mutationFn: (data: { goalId: number }) => {
      const { goalId } = data
      return axiosInstance.delete(`/goals/${goalId}`)
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["goalList"] }),
        queryClient.invalidateQueries({ queryKey: ["todos"] }),
      ])
      Alert.alert("성공", "목표를 삭제했습니다.")
      router.push(ROUTE.dashboard)
    },
    onError: (error: any) => {
      const { message } = error.response.data
      Alert.alert("실패", message)
    },
  })
}

export default useDeleteGoal
