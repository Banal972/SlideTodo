import { GoalType } from "types/goal"

export type AllTodoType = boolean | null

export type TTodoModal = { isModal: boolean }

export interface IuseSubmit {
  todoId: number | null
  isModalCloseHandler: () => void
  selectedGoal: undefined
}

export interface TodoType {
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

export interface SeletedType {
  state: boolean
  setState: (value: React.SetStateAction<boolean>) => void
  label: string
}
