import { todoType } from "@/types/todo";

export interface goalType {
  title: any;
  todos: {
    done: todoType[];
    not: todoType[];
  };
  createDate: any;
  id: string;
}
