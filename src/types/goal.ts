import { todoType } from "@/types/todo";

export interface goalListType {
  title: any;
  createDate: any;
  id: string;
}

export interface goalType extends goalListType {
  todos: {
    done: todoType[];
    not: todoType[];
  };
}
