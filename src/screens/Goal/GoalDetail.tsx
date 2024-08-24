import { Image, Pressable, Text, View } from "react-native"

import AddToDoBtn from "@/components/common/Button/AddToDoBtn"
import CheckList from "@/components/common/CheckList"
import BaseContainer from "@/components/common/Container/BaseContainer"
import NullText from "@/components/common/NullText"
import Process from "@/components/page/goal/Process"
import Color from "@/constant/color"
import Ionicons from "@expo/vector-icons/Ionicons"

const GoalDetail = ({ route }: any) => {
  const id = route.params.id

  console.log(id)

  /* const noteDetailHandler = () => {
      if (!data) return
      router.push(`/note/list/${slug}`)
    } */

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
              {data?.title}
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
      <Pressable>
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
      {/* <BaseContainer color="white">
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
          <NullText>최근에 등록한 할 일이 없어요</NullText>
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
          <NullText>등록한 목표가 없어요</NullText>
        )}
      </View>
    </BaseContainer> */}
    </View>
  )
}

export default GoalDetail
