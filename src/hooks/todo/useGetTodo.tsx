import getAllTodo from "@/api/todo/getAllTodo";
import { todoType } from "@/types/todo";
import { useEffect, useState } from "react";

const useGetTodo = ({ lmt }: { lmt?: number }) => {
  const [type, setType] = useState("all");
  const [todos, setTodos] = useState<todoType[]>([]);

  useEffect(() => {
    const fetch = async () => {
      switch (type) {
        case "all":
          setTodos(await getAllTodo({}));
          break;
        case "todo":
          setTodos(await getAllTodo({ type: "todo" }));
          break;
        case "done":
          setTodos(await getAllTodo({ type: "done" }));
          break;
      }
    };
    fetch();
  }, [type]);

  return { todos, type, setType };
};

export default useGetTodo;
