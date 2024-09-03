import { useQuery } from "@tanstack/react-query"
import axiosInstance from "libs/axiosInstance"
import { useTodoProgressDataType } from "types/todo"

export const useTodoProgress = (id?: number) => {
  const { data, isLoading } = useQuery<useTodoProgressDataType>({
    queryKey: ["progress", id],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get("/todos/progress", {
          params: {
            goalId: id,
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
