import { StyleSheet, Text, View } from "react-native"

import AddToDoBtn from "@/components/common/Button/AddToDoBtn"
import BaseContainer from "@/components/common/Container/BaseContainer"
import NullText from "@/components/common/NullText"
import GoalProcess from "@/components/page/dashboard/GoalProcess"
import BaseTitle from "@/components/page/dashboard/common/BaseTitle"
import TodoDoneList from "@/components/page/goal/TodoDoneList"
import TodoList from "@/components/page/goal/TodoList"
import Color from "@/constant/color"
import { useGetGoalList } from "@/hooks/goal/useGetGoalList"
import { Link } from "expo-router"

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
          <View key={goal.id} style={styles.goalListCotanier}>
            <View style={styles.goalListFlex}>
              <Link href={`/goal/${goal.id}`}>
                <Text style={styles.goalListTitle}>{goal.title}</Text>
              </Link>
              <AddToDoBtn />
            </View>

            <GoalProcess id={goal.id} />

            <View style={{ marginTop: 16 }}>
              <Text style={styles.goalViewTitle}>To do</Text>
              <TodoList id={goal.id} />
            </View>

            <View style={{ marginTop: 24 }}>
              <Text style={styles.goalViewTitle}>Done</Text>
              <TodoDoneList id={goal.id} />
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

const styles = StyleSheet.create({
  goalListCotanier: {
    backgroundColor: Color.blue50,
    padding: 24,
    borderRadius: 32,
  },
  goalListFlex: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  goalListTitle: {
    color: Color.slate800,
    fontSize: 16,
    fontWeight: "bold",
  },
  goalListLinkFlex: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
  goalViewTitle: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
  },
})
