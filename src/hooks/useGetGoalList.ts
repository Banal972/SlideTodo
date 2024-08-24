import axiosInstance from "@/libs/axiosInstance"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

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

  console.log(goalLists)

  return {
    goalLists,
    isLoading,
  }
}

export const PostGoalLists = () => {
  const queryClient = useQueryClient()

  const { mutate: goalPostMutation } = useMutation({
    mutationFn: (data: any) => {
      console.log(data)
      const { goal } = data
      return axiosInstance.post("/goals", {
        title: goal,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goalList"] })
    },
    onError: (error) => {
      console.log(error)
    },
  })

  return { goalPostMutation }
}
