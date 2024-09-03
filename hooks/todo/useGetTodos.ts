import { useQuery } from "@tanstack/react-query"
import axiosInstance from "libs/axiosInstance"
import { TodosData, TodosParamsType } from "types/todo"

export const useGetTodos = ({ goalId, done, cursor, size }: TodosParamsType) => {
  const { data, isLoading } = useQuery<TodosData>({
    queryKey: ["todos", { goalId, done, cursor, size }],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get("/todos", {
          params: {
            goalId,
            done,
            cursor,
            size,
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
