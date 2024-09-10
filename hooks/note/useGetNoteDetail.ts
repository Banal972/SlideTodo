import { useQuery } from "@tanstack/react-query"
import axiosInstance from "libs/axiosInstance"
import { INoteDetail } from "types/note"

export const useGetNoteDetail = ({ noteId }: { noteId: number }) => {
  const { data, isLoading } = useQuery<INoteDetail>({
    queryKey: ["noteDetail", noteId],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(`/notes/${noteId}`)
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
