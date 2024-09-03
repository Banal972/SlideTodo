import { StyleSheet, Text, View } from "react-native"

import AddToDoBtn from "components/common/Button/AddToDoBtn"
import BaseContainer from "components/common/Container/BaseContainer"
import NullText from "components/common/NullText"
import GoalProcess from "components/page/dashboard/GoalProcess"
import BaseTitle from "components/page/dashboard/common/BaseTitle"
import TodoDoneList from "components/page/goal/TodoDoneList"
import TodoList from "components/page/goal/TodoList"
import Color from "constant/color"
import { Link } from "expo-router"
import { useGetGoalList } from "hooks/goal/useGetGoalList"

const GoalList = () => {
  const { goalLists } = useGetGoalList({ cursor: 1 })

  return (
    <BaseContainer color="white" style={{ gap: 16 }}>
      <BaseTitle
        baseIcon={{
          color: Color.orange500,
          source: require("@/assets/images/dashboard/icon02.png"),
        }}
        title="목표 별 할 일"
      />

      {goalLists && goalLists.goals.length > 0 ? (
        goalLists.goals.map((goal) => (
          <View key={goal.id} className="bg-blue-50 p-6 rounded-[32px]">
            <View className="flex-row justify-between">
              <Link href={`/goal/${goal.id}`}>
                <Text className="text-slate-800 text-base font-bold">{goal.title}</Text>
              </Link>
              <AddToDoBtn />
            </View>

            <GoalProcess id={goal.id} />

            <View className="mt-4">
              <Text className="text-sm leading-5 font-semibold">To do</Text>
              <TodoList id={goal.id} goalTitle={goal.title} />
            </View>

            <View style={{ marginTop: 24 }}>
              <Text className="text-sm leading-5 font-semibold">Done</Text>
              <TodoDoneList id={goal.id} goalTitle={goal.title} />
            </View>
          </View>
        ))
      ) : (
        <NullText>등록한 목표가 없어요</NullText>
      )}
    </BaseContainer>
  )
}

export default GoalList
