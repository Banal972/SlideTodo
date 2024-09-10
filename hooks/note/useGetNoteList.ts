import { useQuery } from "@tanstack/react-query"
import axiosInstance from "libs/axiosInstance"
import { IuseGetNoteListReturn, IuseGetNoteListType } from "types/note"

export const useGetNoteList = ({ goalId, cursor, size }: IuseGetNoteListType) => {
  const { data, isLoading } = useQuery<IuseGetNoteListReturn>({
    queryKey: ["notes", goalId],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get("/notes", {
          params: {
            goalId,
            cursor,
            size,
          },
        })
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
