import { Pressable, StyleSheet, Text, View } from "react-native"

import AddToDoBtn from "@/components/common/Button/AddToDoBtn"
import CheckList from "@/components/common/CheckList"
import BaseContainer from "@/components/common/Container/BaseContainer"
import NullText from "@/components/common/NullText"
import BaseTitle from "@/components/page/dashboard/common/BaseTitle"
import Process from "@/components/page/goal/Process"
import Color from "@/constant/color"
import { useGetGoalList } from "@/hooks/goal/useGetGoalList"
import { useGetTodos } from "@/hooks/todo/useGetTodos"
import { Link } from "expo-router"

const TodoList = ({ id }: { id: number }) => {
  const { data } = useGetTodos({ goalId: id, done: false })

  if (!data) return null

  return data.todos.length > 0 ? (
    <View style={styles.goalView}>
      {data.todos.map((todo) => (
        <CheckList key={todo.id} label={todo.title} done={todo.done} />
      ))}
    </View>
  ) : (
    <NullText>최근에 등록한 할 일이 없어요</NullText>
  )
}

const TodoDoneList = ({ id }: { id: number }) => {
  const { data } = useGetTodos({ goalId: id, done: true })

  if (!data) return null

  return data.todos.length > 0 ? (
    <View style={styles.goalView}>
      {data.todos.map((todo) => (
        <CheckList key={todo.id} label={todo.title} done={todo.done} />
      ))}
    </View>
  ) : (
    <NullText>최근에 등록한 할 일이 없어요</NullText>
  )
}

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

            <Process />

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
  goalView: {
    flexDirection: "column",
    gap: 8,
    marginTop: 12,
  },
})
