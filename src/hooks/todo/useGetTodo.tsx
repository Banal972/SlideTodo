import { useEffect, useState } from "react"

import getAllTodo from "@/api/todo/getAllTodo"
import { todoType } from "@/types/todo"

const useGetTodo = ({ lmt }: { lmt?: number }) => {
  const [type, setType] = useState("all")
  const [todos, setTodos] = useState<todoType[]>([])

  useEffect(() => {
    const fetch = async () => {
      switch (type) {
        case "all":
          setTodos(await getAllTodo({ lmt }))
          break
        case "todo":
          setTodos(await getAllTodo({ type: "todo", lmt }))
          break
        case "done":
          setTodos(await getAllTodo({ type: "done", lmt }))
          break
      }
    }
    fetch()
  }, [type])

  return { todos, type, setType }
}

export default useGetTodo
