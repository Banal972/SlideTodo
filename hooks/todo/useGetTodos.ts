import { useInfiniteQuery } from "@tanstack/react-query"
import axiosInstance from "libs/axiosInstance"
import { IuseGetTodosFetch, TodosParamsType } from "types/todo"

export const useGetTodos = ({ goalId, done, size }: TodosParamsType) => {
  const { data, isPending, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["todos", { goalId, done, size }],
    queryFn: ({ pageParam = 0 }) => {
      return fetchs({ goalId, done, size }, pageParam)
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  })

  return {
    data,
    isPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  }
}

const fetchs = async ({ goalId, done, size }: IuseGetTodosFetch, pageParam: number) => {
  let params

  if (pageParam === 0) {
    params = {
      goalId,
      done,
      size,
    }
  } else {
    params = {
      goalId,
      done,
      size,
      cursor: pageParam,
    }
  }

  try {
    const response = await axiosInstance.get("/todos", {
      params,
    })
    return response.data
  } catch (e: any) {
    const { message } = e.response.data
    throw new Error(message)
  }
}

export default fetchs
