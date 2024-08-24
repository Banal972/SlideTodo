import { Alert } from "react-native"

import axiosInstance from "@/libs/axiosInstance"
import { useQuery } from "@tanstack/react-query"

interface UserType {
  id: number
  email: string
  name: string
  createdAt: Date
  updatedAt: Date
}

const useGetUser = () => {
  const { data: user, isLoading } = useQuery<UserType>({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get("/user")
        return response.data
      } catch (e: any) {
        const { message } = e.response.data
        Alert.alert("에러", message)
      }
    },
  })

  return { user, isLoading }
}

export default useGetUser
