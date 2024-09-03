import { Pressable, Text } from "react-native"

import useNewTodoModalStore from "store/useNewTodoModalStore"

const AddToDoBtn = () => {
  const { open: openModalHanlder } = useNewTodoModalStore()
  return (
    <Pressable onPress={openModalHanlder}>
      <Text className="text-blue-500 text-sm font-semibold">+ 할일 추가</Text>
    </Pressable>
  )
}

export default AddToDoBtn
