import { Text, TouchableOpacity } from "react-native"

import useNewTodoModalStore from "store/useNewTodoModalStore"

const AddToDoBtn = () => {
  const { open: openModalHanlder } = useNewTodoModalStore()
  return (
    <TouchableOpacity onPress={() => openModalHanlder({})}>
      <Text className="text-blue-500 text-sm font-semibold">+ 할일 추가</Text>
    </TouchableOpacity>
  )
}

export default AddToDoBtn
