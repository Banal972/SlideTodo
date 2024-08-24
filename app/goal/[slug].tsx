import { Image, Pressable, Text, View } from "react-native"

import AddToDoBtn from "@/components/common/Button/AddToDoBtn"
import BaseContainer from "@/components/common/Container/BaseContainer"
import Process from "@/components/page/goal/Process"
import TodoDoneList from "@/components/page/goal/TodoDoneList"
import TodoList from "@/components/page/goal/TodoList"
import Color from "@/constant/color"
import { useGetGoalDetail } from "@/hooks/goal/useGetGoalDetail"
import Ionicons from "@expo/vector-icons/Ionicons"
import { Link, useLocalSearchParams, useRouter } from "expo-router"

const GoalDetail = () => {
  const { slug } = useLocalSearchParams<{ slug: string }>()

  const { data } = useGetGoalDetail({ goalId: slug })

  const router = useRouter()

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

      <BaseContainer
        color={Color.blue100}
        style={{ flexDirection: "row", justifyContent: "space-between" }}
      >
        <Link href={`/note/list/${slug}`}>
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
        </Link>
      </BaseContainer>

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
          <TodoList id={Number(slug)} />
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
          <TodoDoneList id={Number(slug)} />
        </View>
      </BaseContainer>
    </View>
  )
}

export default GoalDetail
