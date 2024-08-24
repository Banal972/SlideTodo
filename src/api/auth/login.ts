import axiosInstance from "@/libs/axiosInstance"
import { saveStore } from "@/libs/secureStore"

const login = async (data: any) => {
  const { email, password } = data

  const response = await axiosInstance.post(`/auth/login`, {
    email,
    password,
  })

  saveStore("accessToken", response.data.accessToken)
}

export default login
