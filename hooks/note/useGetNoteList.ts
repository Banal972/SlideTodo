import { useQuery } from "@tanstack/react-query"
import axiosInstance from "libs/axiosInstance"

interface useGetNoteListType {
  goalId?: number
  cursor?: number
  size?: number
}

export interface Root {
  nextCursor: number
  totalCount: number
  notes: Note[]
}

export interface Note {
  todo: Todo
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
  title: string
  id: number
}

export interface Goal {
  title: string
  id: number
}

export const useGetNoteList = ({ goalId, cursor, size }: useGetNoteListType) => {
  const { data, isLoading } = useQuery<Root>({
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
