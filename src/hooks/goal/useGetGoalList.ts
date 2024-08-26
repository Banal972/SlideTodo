import axiosInstance from "@/libs/axiosInstance"
import { goalListParams, goalListType } from "@/types/goal"
import { useQuery } from "@tanstack/react-query"

export const useGetGoalList = ({ cursor, size, sortOrder }: goalListParams) => {
  const { data: goalLists, isLoading } = useQuery<goalListType>({
    queryKey: ["goalList"],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get("/goals", {
          params: { cursor, size, sortOrder: sortOrder || "oldest" },
        })
        return response.data
      } catch (e: any) {
        const { message } = e.response.data
        throw new Error(message)
      }
    },
  })
  return {
    goalLists,
    isLoading,
  }
}
