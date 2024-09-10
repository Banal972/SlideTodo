import { useQuery } from "@tanstack/react-query"
import axiosInstance from "libs/axiosInstance"
import { GoalType } from "types/goal"

export const useGetGoalDetail = ({ goalId }: { goalId: string }) => {
  const { data, isPending } = useQuery<GoalType>({
    queryKey: ["goalDetail", goalId],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(`/goals/${goalId}`)
        return response.data
      } catch (e: any) {
        const { message } = e.response.data
        throw new Error(message)
      }
    },
  })

  return {
    data,
    isPending,
  }
}
