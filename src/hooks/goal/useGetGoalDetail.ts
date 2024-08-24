import axiosInstance from "@/libs/axiosInstance"
import { useQuery } from "@tanstack/react-query"

export const useGetGoalDetail = ({ goalId }: { goalId: string }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["goalDetail", goalId],
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
