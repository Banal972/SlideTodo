import { Pressable, StyleSheet, Text, View } from "react-native"

import Color from "@/constant/color"
import { Todo } from "@/hooks/todo/useGetTodos"
import axiosInstance from "@/libs/axiosInstance"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import Checkbox from "expo-checkbox"

const CheckList = ({ data }: { data: Todo }) => {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: async (update: {
      title: string
      fileUrl: string
      linkUrl: string
      goalId: number
      done: boolean
    }) => {
      const response = await axiosInstance.patch(`/todos/${data.id}`, update)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] })
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const checkPressHanlder = () => {
    mutate({
      title: data.title,
      fileUrl: data.fileUrl,
      linkUrl: data.linkUrl,
      goalId: data.goal.id,
      done: !data.done,
    })
  }

  const onPressHandler = () => {}

  return (
    <View style={styles.listFlex}>
      <Checkbox
        value={data.done}
        color={data.done ? Color.blue500 : undefined}
        style={styles.todoListCheckbox}
        onValueChange={checkPressHanlder}
      />
      <Pressable onPress={onPressHandler}>
        <Text style={[styles.listText, data.done && { textDecorationLine: "line-through" }]}>
          {data.title}
        </Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  listFlex: {
    flexDirection: "row",
    gap: 8,
  },
  todoListCheckbox: {
    borderColor: Color.slate200,
    borderRadius: 6,
    backgroundColor: "white",
  },
  listText: {
    color: "#1F2937",
    fontSize: 14,
    lineHeight: 20,
  },
})

export default CheckList
