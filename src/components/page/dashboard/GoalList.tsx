import BaseContainer from "@/components/common/Container/BaseContainer";
import BaseTitle from "@/components/page/dashboard/common/BaseTitle";
import Color from "@/constant/color";
import { Link } from "expo-router";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import CheckList from "@/components/common/CheckList";
import Process from "@/components/page/goal/Process";
import { useEffect, useState } from "react";
import { db } from "firebaseConfig";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import useNewTodoModalStore from "@/store/useNewTodoModalStore";

interface todoType {
  title: any;
  createDate: any;
  done: boolean;
  id: string;
}

interface goalType {
  title: any;
  todos: {
    done: todoType[];
    not: todoType[];
  };
  createDate: any;
  id: string;
}

const GoalList = () => {
  const { open: newTodoOpenHandler } = useNewTodoModalStore();
  const [goals, setGoal] = useState<goalType[]>([]);

  const fetchGoal = async () => {
    const q = query(collection(db, "goal"), orderBy("createDate", "desc"));
    const querySnapshot = await getDocs(q);

    const goals = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const { title, createDate } = doc.data();

        const todosDoneQuery = query(
          collection(db, "todos"),
          where("goal_ID", "==", doc.id),
          where("done", "==", true),
          orderBy("createDate", "desc")
        );

        const todosNotDoneQuery = query(
          collection(db, "todos"),
          where("goal_ID", "==", doc.id),
          where("done", "==", false),
          orderBy("createDate", "desc")
        );

        const todoDoneSnapShot = await getDocs(todosDoneQuery);
        const todoNotDoneSnapShot = await getDocs(todosNotDoneQuery);

        return {
          title: title,
          todos: {
            done: todoDoneSnapShot.docs.map((doc) => {
              const { title, createDate, notes, done } = doc.data();
              return {
                title,
                createDate,
                done,
                id: doc.id,
              };
            }),
            not: todoNotDoneSnapShot.docs.map((doc) => {
              const { title, createDate, notes, done } = doc.data();
              return {
                title,
                createDate,
                done,
                id: doc.id,
              };
            }),
          },
          createDate: createDate,
          id: doc.id,
        };
      })
    );
    setGoal(goals);
  };

  useEffect(() => {
    fetchGoal();
  }, []);

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
              <Link href={"/goal/1"} style={styles.goalListTitle}>
                {goal.title}
              </Link>
              <Pressable onPress={newTodoOpenHandler}>
                <View style={styles.goalListLinkFlex}>
                  <Ionicons name="add" size={24} color={Color.blue500} />
                  <Text style={styles.goalListLink}>할일 추가</Text>
                </View>
              </Pressable>
            </View>

            <Process />

            {goal.todos.not.length > 0 && (
              <View style={{ marginTop: 16 }}>
                <Text style={styles.goalViewTitle}>To do</Text>
                <View style={styles.goalView}>
                  {goal.todos.done.map((todo) => (
                    <CheckList key={todo.id} label={todo.title} />
                  ))}
                </View>
              </View>
            )}

            {goal.todos.not.length > 0 && (
              <View style={{ marginTop: 24 }}>
                <Text style={styles.goalViewTitle}>Done</Text>
                <View style={styles.goalView}>
                  {goal.todos.not.map((todo) => (
                    <CheckList key={todo.id} label={todo.title} />
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
  goalListLink: {
    color: Color.blue500,
    fontSize: 12,
    fontWeight: "600",
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
