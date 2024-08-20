import getTodo from "@/api/todo/getTodo";
import { todoType } from "@/types/todo";
import { useEffect, useState } from "react";

const useGetTodo = () => {
  const [todos, setTodos] = useState<todoType[]>([]);

  useEffect(() => {
    const fetch = async () => {
      setTodos(await getTodo());
    };

    fetch();
  }, []);

  return { todos };
};

export default useGetTodo;
