import { useQuery } from "@tanstack/react-query"
import axiosInstance from "libs/axiosInstance"

export interface Root {
  todo: Todo
  linkUrl: string
  content: string
  updatedAt: string
  createdAt: string
  title: string
  id: number
  goal: Goal
  userId: number
  teamId: string
}

export interface Todo {
  done: boolean
  fileUrl: string
  linkUrl: string
  title: string
  id: number
}

export interface Goal {
  title: string
  id: number
}

export const useGetNoteDetail = ({ noteId }: { noteId: number }) => {
  const { data, isLoading } = useQuery<Root>({
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
