import { GoalType } from "@/types/goal"

interface TodoType {
  noteId: number
  done: boolean
  linkUrl: string
  fileUrl: string
  title: string
  id: number
  goal: Pick<GoalType, "id" | "title">
  userId: number
  teamId: string
  updatedAt: string
  createdAt: string
}

export interface TodosData {
  totalCount: number
  nextCursor: number
  todos: TodoType[]
}

export interface TodosParamsType {
  goalId?: number
  done?: boolean | null
  cursor?: number
  size?: number
}

export interface useTodoProgressDataType {
  progress: number
}

export interface TodoPostValue {
  title: string
  fileUrl: string
  linkUrl: string
  goalId?: number
}

export interface TodoUpdate {
  title: string
  fileUrl: string
  linkUrl: string
  goalId: number
  done: boolean
}
