import axiosInstance from "@/libs/axiosInstance"
import { useQuery } from "@tanstack/react-query"

interface useTodoProgressType {
  goalId: string
}
interface useTodoProgressDataType {
  progress: number
}

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
