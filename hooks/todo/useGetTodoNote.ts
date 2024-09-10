import { useQuery } from "@tanstack/react-query"
import axiosInstance from "libs/axiosInstance"
import { TNoteId } from "types/note"

const useGetTodoNote = ({ noteId }: TNoteId) => {
  const { data, isPending } = useQuery({
    queryKey: ["todoNote", noteId],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(`/notes/${noteId}`)
        return response.data.title
      } catch (e: any) {
        const { message } = e.response.data
        throw new Error(message)
      }
    },
  })

  return {
    data,
    isPending,
  }
}

export default useGetTodoNote
