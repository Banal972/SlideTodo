import { StyleSheet, Text, View } from "react-native"

import AddToDoBtn from "@/components/common/Button/AddToDoBtn"
import CheckList from "@/components/common/CheckList"
import BaseContainer from "@/components/common/Container/BaseContainer"
import NullText from "@/components/common/NullText"
import BaseTitle from "@/components/page/dashboard/common/BaseTitle"
import Process from "@/components/page/goal/Process"
import Color from "@/constant/color"
import { useGetGoalList } from "@/hooks/useGetGoalList"
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
              <Link href={`/goal/${goal.id}`} style={styles.goalListTitle}>
                {goal.title}
              </Link>
              <AddToDoBtn />
            </View>

            <Process />

            {/* <View style={{ marginTop: 16 }}>
              <Text style={styles.goalViewTitle}>To do</Text>
              {goal.todos.not.length > 0 ? (
                <View style={styles.goalView}>
                  {goal.todos.not.map((todo) => (
                    <CheckList
                      goal_ID={todo.goal_ID}
                      docId={todo.id}
                      key={todo.id}
                      label={todo.title}
                    />
                  ))}
                </View>
              ) : (
                <NullText>최근에 등록한 할 일이 없어요</NullText>
              )}
            </View>

            <View style={{ marginTop: 24 }}>
              <Text style={styles.goalViewTitle}>Done</Text>
              {goal.todos.done.length > 0 ? (
                <View style={styles.goalView}>
                  {goal.todos.done.map((todo) => (
                    <CheckList
                      goal_ID={todo.goal_ID}
                      docId={todo.id}
                      done={todo.done}
                      key={todo.id}
                      label={todo.title}
                    />
                  ))}
                </View>
              ) : (
                <NullText>최근에 등록한 할 일이 없어요</NullText>
              )}
            </View> */}
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
  goalView: {
    flexDirection: "column",
    gap: 8,
    marginTop: 12,
  },
})
