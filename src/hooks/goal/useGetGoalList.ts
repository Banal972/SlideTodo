import axiosInstance from "@/libs/axiosInstance"
import { useQuery } from "@tanstack/react-query"

export interface goalListType {
  nextCursor: number
  totalCount: number
  goals: Goal[]
}

export interface Goal {
  updatedAt: string
  createdAt: string
  title: string
  id: number
  userId: number
  teamId: string
}

interface goalListRequest {
  cursor: number
  size?: number
  sortOrder?: "oldest" | "newest"
}

export const useGetGoalList = ({ cursor, size, sortOrder }: goalListRequest) => {
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
