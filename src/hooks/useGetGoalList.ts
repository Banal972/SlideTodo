import { useEffect, useState } from "react"

import axiosInstance from "@/libs/axiosInstance"

export interface goalListType {
  nextCursor: number
  totalCount: number
  goals: Goal[]
}

export interface Goal {
  updatedAt: string
  createdAt: string
  title: string
  id: number
  userId: number
  teamId: string
}

interface goalListRequest {
  cursor: number
  size?: number
  sortOrder?: "oldest" | "newest"
}

const useGetGoalList = ({ cursor, size, sortOrder }: goalListRequest) => {
  const [goalLists, setGoalLists] = useState<goalListType | null>(null)

  useEffect(() => {
    const fetch = async () => {
      const res = await axiosInstance.get("/goals", {
        params: { cursor, size, sortOrder: sortOrder || "oldest" },
      })

      setGoalLists(res.data)
    }

    fetch()
  }, [])

  return { goalLists }
}

export default useGetGoalList
