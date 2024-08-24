import axiosInstance from "@/libs/axiosInstance"
import { useQuery } from "@tanstack/react-query"

export interface Root {
  totalCount: number
  nextCursor: number
  todos: Todo[]
}

export interface Todo {
  noteId: number
  done: boolean
  linkUrl: string
  fileUrl: string
  title: string
  id: number
  goal: Goal
  userId: number
  teamId: string
  updatedAt: string
  createdAt: string
}

export interface Goal {
  id: number
  title: string
}

interface TodosType {
  goalId?: number
  done?: boolean | null
  cursor?: number
  size?: number
}

export const useGetTodos = ({ goalId, done, cursor, size }: TodosType) => {
  const { data, isLoading } = useQuery<Root>({
    queryKey: ["todos", { goalId, done, cursor, size }],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get("/todos", {
          params: {
            goalId,
            done,
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
