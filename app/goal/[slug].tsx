import React, { useEffect, useState } from "react"
import { Image, Pressable, Text, View } from "react-native"

import AddToDoBtn from "@/components/common/Button/AddToDoBtn"
import CheckList from "@/components/common/CheckList"
import BaseContainer from "@/components/common/Container/BaseContainer"
import Process from "@/components/page/goal/Process"
import Color from "@/constant/color"
import useGetUser from "@/hooks/useGetUser"
import useNoteNameStore from "@/store/useNoteStore"
import { goalType } from "@/types/goal"
import Ionicons from "@expo/vector-icons/Ionicons"
import { useLocalSearchParams, useRouter } from "expo-router"
import { collection, doc, getDoc, getDocs, orderBy, query, where } from "firebase/firestore"
import { db } from "firebaseConfig"

const GoalDetail = () => {
  const { changeName } = useNoteNameStore()
  const { slug } = useLocalSearchParams<{ slug: string }>()
  const router = useRouter()
  const [goalData, setGoalData] = useState<goalType | null>(null)
  const { user } = useGetUser()

  const noteDetailHandler = () => {
    if (!goalData) return
    changeName(goalData.title)
    router.push(`/note/list/${slug}`)
  }

  useEffect(() => {
    const fetch = async () => {
      const documentId = slug
      const docRef = doc(db, "goals", documentId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const { title, createDate } = docSnap.data()

        const todosDoneQuery = query(
          collection(db, "todos"),
          where("goal_ID", "==", docSnap.id),
          where("done", "==", true),
          orderBy("createDate", "desc"),
        )

        const todosNotDoneQuery = query(
          collection(db, "todos"),
          where("goal_ID", "==", docSnap.id),
          where("done", "==", false),
          orderBy("createDate", "desc"),
        )

        const [todoDoneSnapShot, todoNotDoneSnapShot] = await Promise.all([
          getDocs(todosDoneQuery),
          getDocs(todosNotDoneQuery),
        ])

        const goal = {
          title: title,
          todos: {
            done: todoDoneSnapShot.docs.map((doc) => {
              const { title, createDate, goal_ID, done } = doc.data()
              return {
                title,
                createDate,
                done,
                goal_ID,
                id: doc.id,
              }
            }),
            not: todoNotDoneSnapShot.docs.map((doc) => {
              const { title, createDate, goal_ID, done } = doc.data()
              return {
                title,
                createDate,
                done,
                goal_ID,
                id: doc.id,
              }
            }),
          },
          createDate: createDate,
          id: docSnap.id,
        }
        setGoalData(goal)
      } else {
        setGoalData(null)
      }
    }
    fetch()
  }, [slug, user])

  return (
    <View style={{ padding: 16, gap: 16 }}>
      <BaseContainer color="white">
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: Color.slate800,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 15,
              }}
            >
              <Image source={require("@/assets/images/goal/icon01.png")} />
            </View>
            <Text style={{ fontSize: 16, fontWeight: "600", color: Color.slate800 }}>
              {goalData?.title}
            </Text>
          </View>
          <Pressable>
            <Ionicons name="ellipsis-vertical" size={24} color={Color.slate400} />
          </Pressable>
        </View>
        <View style={{ marginTop: 24 }}>
          <Text style={{ fontSize: 12, fontWeight: "600", color: "#0F172A" }}>진행율</Text>
          <Process />
        </View>
      </BaseContainer>
      <Pressable onPress={noteDetailHandler}>
        <BaseContainer
          color={Color.blue100}
          style={{ flexDirection: "row", justifyContent: "space-between" }}
        >
          <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
            <Image source={require("@/assets/images/goal/note.png")} />
            <Text
              style={{
                color: Color.slate800,
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              노트 모아보기
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color={Color.slate600} />
        </BaseContainer>
      </Pressable>
      <BaseContainer color="white">
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold", color: Color.slate800 }}>To do</Text>
          <AddToDoBtn />
        </View>
        <View style={{ gap: 8, marginTop: 16 }}>
          {goalData && goalData.todos.not.length > 0 ? (
            <>
              {goalData.todos.not.map((todo) => (
                <CheckList
                  goal_ID={todo.goal_ID}
                  docId={todo.id}
                  key={todo.id}
                  label={todo.title}
                />
              ))}
            </>
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
              최근에 등록한 할 일이 없어요
            </Text>
          )}
        </View>
      </BaseContainer>
      <BaseContainer color={Color.slate200}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold", color: Color.slate800 }}>Done</Text>
        </View>
        <View style={{ gap: 8, marginTop: 16 }}>
          {goalData && goalData.todos.done.length > 0 ? (
            <>
              {goalData.todos.done.map((todo) => (
                <CheckList
                  goal_ID={todo.goal_ID}
                  docId={todo.id}
                  done={todo.done}
                  key={todo.id}
                  label={todo.title}
                />
              ))}
            </>
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
        </View>
      </BaseContainer>
    </View>
  )
}

export default GoalDetail
