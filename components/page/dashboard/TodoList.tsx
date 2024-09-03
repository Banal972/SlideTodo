import { View } from "react-native"

import CheckList from "components/common/CheckList"
import BaseContainer from "components/common/Container/BaseContainer"
import NullText from "components/common/NullText"
import BaseTitle from "components/page/dashboard/common/BaseTitle"
import { useGetTodos } from "hooks/todo/useGetTodos"

const TodoList = () => {
  const { data } = useGetTodos({})

  return (
    <BaseContainer color="white">
      <BaseTitle
        baseIcon={{
          color: "#3B82F6",
          source: require("@/assets/images/dashboard/icon01.png"),
        }}
        title="최근 등록한 일"
        linkURL="alltodo"
      />
      {data && data.todos.length > 0 ? (
        <View className="mt-4" style={{ gap: 8 }}>
          {data.todos.map((todo) => (
            <CheckList key={todo.id} data={todo} />
          ))}
        </View>
      ) : (
        <NullText>최근에 등록한 할 일이 없어요</NullText>
      )}
    </BaseContainer>
  )
}

export default TodoList
