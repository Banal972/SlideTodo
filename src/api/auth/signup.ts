import axiosInstance from "@/libs/axiosInstance"

const signup = async (data: any) => {
  const { email, name, password } = data
  await axiosInstance.post(
    "/user",
    {
      email,
      name,
      password,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  )
}

export default signup
