import axios, { AxiosError } from "axios"
import { getStore } from "libs/secureStore"

const getAuthorization = async () => {
  return `Bearer ${await getStore("accessToken")}`
}

const axiosInstance = axios.create({
  baseURL: `${process.env.EXPO_PUBLIC_API}/${process.env.EXPO_PUBLIC_API_TEAMID}`,
})

axiosInstance.interceptors.request.use(
  async (config: any) => {
    config.headers["Content-Type"] = "application/json"
    config.headers["Authorization"] = await getAuthorization()
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

export default axiosInstance
