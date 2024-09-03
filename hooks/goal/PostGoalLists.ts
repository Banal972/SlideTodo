import { QueryClient, useMutation } from "@tanstack/react-query"
import axiosInstance from "libs/axiosInstance"
import { PostGoalType } from "types/goal"

const PostGoalLists = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: (data: PostGoalType) => {
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
}
export default PostGoalLists
