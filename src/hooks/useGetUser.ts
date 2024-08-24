import { useEffect, useState } from "react"
import { Alert } from "react-native"

import axiosInstance from "@/libs/axiosInstance"

interface UserType {
  id: number
  email: string
  name: string
  createdAt: Date
  updatedAt: Date
}

const useGetUser = () => {
  const [user, setUser] = useState<UserType | null>(null)

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axiosInstance.get("/user")
        setUser(response.data)
      } catch (e: any) {
        const { message } = e.response.data
        Alert.alert("에러", message)
      }
    }

    fetch()
  }, [])

  return { user }
}

export default useGetUser
