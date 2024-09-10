import { Fragment } from "react"
import { View } from "react-native"

import AllTodoList from "components/common/AllTodoList/AllTodoList"
import MoreBtn from "components/common/Button/MoreBtn"
import NullText from "components/common/NullText"
import SkeletonTodo from "components/page/todo/SkeletonTodo"
import { useGetTodos } from "hooks/todo/useGetTodos"

const GoalTodoList = ({ id, done, size }: { id: number; done: boolean; size?: number }) => {
  const { data, isPending, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetTodos({
    goalId: id,
    done: done,
    size,
  })

  return (
    <>
      <View className="flex-col mt-3" style={{ gap: 8 }}>
        {isPending ? (
          <SkeletonTodo />
        ) : (
          <>
            {data?.pages.map((page, i) => (
              <Fragment key={i}>
                {page.totalCount === 0 && <NullText>아직 해야할 일이 없어요</NullText>}
                {page.totalCount !== 0 &&
                  page.todos.map((todo: any) => <AllTodoList todo={todo} key={todo.id} />)}
              </Fragment>
            ))}
            {(isFetchingNextPage || hasNextPage) && <MoreBtn onPress={fetchNextPage} />}
          </>
        )}
      </View>
    </>
  )
}

export default GoalTodoList
