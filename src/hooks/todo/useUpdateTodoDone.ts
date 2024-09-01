import axiosInstance from "@/libs/axiosInstance"
import { TodoType, TodoUpdate } from "@/types/todo"
import { QueryClient, useMutation } from "@tanstack/react-query"

const useUpdateTodoDone = (queryClient: QueryClient, data: TodoType) => {
  return useMutation({
    mutationFn: async (update: TodoUpdate) => {
      const response = await axiosInstance.patch(`/todos/${data.id}`, update)
      return response.data
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["todos"] }),
        queryClient.invalidateQueries({ queryKey: ["goalList"] }),
        queryClient.invalidateQueries({ queryKey: ["progress"] }),
      ])
    },
    onError: (error) => {
      console.log(error)
    },
  })
}

export default useUpdateTodoDone
