import axiosInstance from "@/libs/axiosInstance"
import { useQuery } from "@tanstack/react-query"

export interface GoalDetailType {
  updatedAt: string
  createdAt: string
  title: string
  id: number
  userId: number
  teamId: string
}

const useGoalDetail = ({ goalId }: { goalId: string }) => {
  const { data, isLoading } = useQuery<GoalDetailType>({
    queryKey: ["goalList"],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(`/goals/${Number(goalId)}`)
        return response.data
      } catch (e: any) {
        const { message } = e.response.data
        throw new Error(message)
      }
    },
  })
  return {
    data,
    isLoading,
  }
}

export default useGoalDetail
