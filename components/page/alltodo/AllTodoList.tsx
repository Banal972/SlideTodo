import { Text, View } from "react-native"

import { useQueryClient } from "@tanstack/react-query"
import NoteBottom from "components/page/alltodo/NoteBottom"
import Color from "constant/color"
import Checkbox from "expo-checkbox"
import useUpdateTodoDone from "hooks/todo/useUpdateTodoDone"
import { TodoType } from "types/todo"

const AllTodoList = ({ todo }: { todo: TodoType }) => {
  const queryClient = useQueryClient()
  const { mutate } = useUpdateTodoDone(queryClient, todo)
  const checkPressHanlder = () =>
    mutate({
      title: todo.title,
      fileUrl: todo.fileUrl,
      linkUrl: todo.linkUrl,
      goalId: todo.goal.id,
      done: !todo.done,
    })

  return (
    <View>
      <View className="gap-2 flex-row">
        <Checkbox
          value={todo.done}
          color={todo.done ? Color.blue500 : undefined}
          className="border-slate-200 border rounded-md bg-white"
          onValueChange={checkPressHanlder}
        />
        <Text className={`text-[#1F2937] text-sm leading-5 ${todo.done && "line-through"}`}>
          {todo.title}
        </Text>
      </View>
      {todo.noteId && <NoteBottom noteId={todo.noteId} />}
    </View>
  )
}

export default AllTodoList
