import axiosInstance from "@/libs/axiosInstance"
import { useTodoProgressDataType, useTodoProgressType } from "@/types/todo"
import { useQuery } from "@tanstack/react-query"

export const useTodoProgress = ({ goalId }: useTodoProgressType) => {
  const { data, isLoading } = useQuery<useTodoProgressDataType>({
    queryKey: ["progress"],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get("/todos/progress", {
          params: {
            goalId: Number(goalId),
          },
        })
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
