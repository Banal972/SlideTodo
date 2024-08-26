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
