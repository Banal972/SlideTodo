export type GoalSlug = {
  slug: string
}

export type Tprogress = {
  progress: number
}

export interface goalListType {
  nextCursor: number
  totalCount: number
  goals: GoalType[]
}

export interface GoalType {
  updatedAt: string
  createdAt: string
  title: string
  id: number
  userId: number
  teamId: string
}

export interface goalListParams {
  cursor: number
  size?: number
  sortOrder?: "oldest" | "newest"
}

export interface PostGoalType {
  goal: string
}

export interface IuseDelete extends GoalSlug {
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export interface IEditModal extends GoalSlug {
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
  isEditVisible: boolean
  setIsEditVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export interface IGoalTodoList {
  id: number
  done: boolean
  size?: number
}
