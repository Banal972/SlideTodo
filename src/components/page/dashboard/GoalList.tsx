import BaseContainer from "@/components/common/Container/BaseContainer";
import BaseTitle from "@/components/page/dashboard/common/BaseTitle";
import Color from "@/constant/color";
import { Link } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import CheckList from "@/components/common/CheckList";
import Process from "@/components/page/goal/Process";
import useGetGoal from "@/hooks/goal/useGetGoal";
import AddToDoBtn from "@/components/common/Button/AddToDoBtn";

const GoalList = () => {
  const { goals } = useGetGoal();

  return (
    <BaseContainer color="white" style={{ gap: 16 }}>
      <BaseTitle
        baseIcon={{
          color: Color.orange500,
          source: require("@/assets/images/dashboard/icon02.png"),
        }}
        title="목표 별 할 일"
      />

      {goals.length > 0 ? (
        goals.map((goal) => (
          <View key={goal.id} style={styles.goalListCotanier}>
            <View style={styles.goalListFlex}>
              <Link href={`/goal/${goal.id}`} style={styles.goalListTitle}>
                {goal.title}
              </Link>
              <AddToDoBtn />
            </View>

            <Process />

            {goal.todos.not.length > 0 && (
              <View style={{ marginTop: 16 }}>
                <Text style={styles.goalViewTitle}>To do</Text>
                <View style={styles.goalView}>
                  {goal.todos.not.map((todo) => (
                    <CheckList key={todo.id} label={todo.title} />
                  ))}
                </View>
              </View>
            )}

            {goal.todos.done.length > 0 && (
              <View style={{ marginTop: 24 }}>
                <Text style={styles.goalViewTitle}>Done</Text>
                <View style={styles.goalView}>
                  {goal.todos.done.map((todo) => (
                    <CheckList
                      done={todo.done}
                      key={todo.id}
                      label={todo.title}
                    />
                  ))}
                </View>
              </View>
            )}
          </View>
        ))
      ) : (
        <Text
          style={{
            textAlign: "center",
            fontSize: 14,
            color: Color.slate500,
            paddingTop: 30,
            paddingBottom: 60,
          }}
        >
          등록한 목표가 없어요
        </Text>
      )}
    </BaseContainer>
  );
};

export default GoalList;

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
});
