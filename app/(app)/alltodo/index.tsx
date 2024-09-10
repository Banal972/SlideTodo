import { Fragment, useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"

import AllTodoList from "components/common/AllTodoList/AllTodoList"
import AddToDoBtn from "components/common/Button/AddToDoBtn"
import MoreBtn from "components/common/Button/MoreBtn"
import SkeletonTodo from "components/page/todo/SkeletonTodo"
import { todoType } from "constant/type"
import { useGetTodos } from "hooks/todo/useGetTodos"
import { AllTodoType } from "types/todo"

const AllTodoPage = () => {
  const [type, setType] = useState<AllTodoType>(null)
  const { data, isPending, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetTodos({
    done: type,
    size: 30,
  })

  return (
    <View className="p-4">
      <View className="flex-row justify-between items-center">
        <Text className="text-base font-semibold text-slate-900">
          모든 할 일 ({data?.pages[0].totalCount || 0})
        </Text>
        <AddToDoBtn />
      </View>

      <View className="bg-white border border-slate-100 rounded-xl mt-4 p-4">
        <View className="flex-row gap-2">
          {todoType.map((types, index) => (
            <TouchableOpacity
              key={index + 1}
              className={`px-3 py-1 rounded-[17px] border border-slate-200 ${type === types.key && "bg-blue-500 border-blue-500"}`}
              onPress={() => setType(types.key)}
            >
              <Text
                className={` text-slate-800 text-sm font-medium ${type === types.key && "text-white"}`}
              >
                {types.value}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View className="mt-4" style={{ gap: 8 }}>
          {isPending ? (
            <SkeletonTodo />
          ) : (
            <>
              {data?.pages.map((page, i) => (
                <Fragment key={i}>
                  {page.todos.map((todo: any) => (
                    <AllTodoList todo={todo} key={todo.id} />
                  ))}
                </Fragment>
              ))}
              {(isFetchingNextPage || hasNextPage) && <MoreBtn onPress={fetchNextPage} />}
            </>
          )}
        </View>
      </View>
    </View>
  )
}

export default AllTodoPage
