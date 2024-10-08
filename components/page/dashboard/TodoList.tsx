import { Fragment } from "react"
import { View } from "react-native"

import AllTodoList from "components/common/AllTodoList/AllTodoList"
import MoreBtn from "components/common/Button/MoreBtn"
import BaseContainer from "components/common/Container/BaseContainer"
import NullText from "components/common/NullText"
import BaseTitle from "components/page/dashboard/common/BaseTitle"
import SkeletonTodo from "components/page/todo/SkeletonTodo"
import { useGetTodos } from "hooks/todo/useGetTodos"

const TodoList = () => {
  const { data, isPending, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetTodos({
    size: 10,
  })

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

      <View className="mt-4" style={{ gap: 15 }}>
        {isPending ? (
          <SkeletonTodo />
        ) : (
          <>
            {data?.pages.map((page, i) => (
              <Fragment key={i}>
                {page.totalCount === 0 && <NullText>최근에 등록한 할 일이 없어요</NullText>}
                {page.totalCount !== 0 &&
                  page.todos.map((todo: any) => <AllTodoList key={todo.id} todo={todo} />)}
              </Fragment>
            ))}
            {(isFetchingNextPage || hasNextPage) && <MoreBtn onPress={fetchNextPage} />}
          </>
        )}
      </View>
    </BaseContainer>
  )
}

export default TodoList
