import axiosInstance from "@/libs/axiosInstance"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const queryClient = useQueryClient()

export const PostGoalLists = () => {
  const { mutate: goalPostMutation } = useMutation({
    mutationFn: (data: any) => {
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
