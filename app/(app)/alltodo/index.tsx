import { Fragment, Suspense, useEffect, useState } from "react"
import { Animated, Easing, Pressable, Text, View } from "react-native"

import AddToDoBtn from "components/common/Button/AddToDoBtn"
import MoreBtn from "components/common/Button/MoreBtn"
import AllTodoList from "components/page/alltodo/AllTodoList"
import { todoType } from "constant/type"
import { useGetTodos } from "hooks/todo/useGetTodos"

const SkeletonTodo = () => {
  const [opacityAnim] = useState(new Animated.Value(0.4))

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
        Animated.timing(opacityAnim, {
          toValue: 0.4,
          duration: 700,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
      ]),
    ).start()
  }, [])

  return (
    <>
      {new Array(5).fill(0).map((_, i) => (
        <Animated.View
          key={i}
          className="w-full h-4 bg-gray-300"
          style={{ opacity: opacityAnim }}
        />
      ))}
    </>
  )
}

const AllTodoPage = () => {
  const [type, setType] = useState<boolean | null>(null)
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetTodos({
    done: type,
    size: 30,
  })

  return (
    <View className="p-4">
      <View className="flex-row justify-between">
        <Text className="text-base font-semibold text-slate-900">
          모든 할 일 ({data.pages[0].totalCount || 0})
        </Text>
        <AddToDoBtn />
      </View>

      <View className="bg-white border border-slate-100 rounded-xl mt-4 p-4">
        <View className="flex-row gap-2">
          {todoType.map((types, index) => (
            <Pressable
              key={index + 1}
              className={`px-3 py-1 rounded-[17px] border border-slate-200 ${type === types.key && "bg-blue-500 border-blue-500"}`}
              onPress={() => setType(types.key)}
            >
              <Text
                className={` text-slate-800 text-sm font-medium ${type === types.key && "text-white"}`}
              >
                {types.value}
              </Text>
            </Pressable>
          ))}
        </View>

        <View className="mt-4" style={{ gap: 8 }}>
          <Suspense fallback={<SkeletonTodo />}>
            {data.pages.map((page, i) => (
              <Fragment key={i}>
                {page.todos.map((todo: any) => (
                  <AllTodoList todo={todo} key={todo.id} />
                ))}
              </Fragment>
            ))}
            {(isFetchingNextPage || hasNextPage) && <MoreBtn onPress={fetchNextPage} />}
          </Suspense>
        </View>
      </View>
    </View>
  )
}

export default AllTodoPage
