import { useState } from "react"
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from "react-native"

import Ionicons from "@expo/vector-icons/Ionicons"
import { useQueryClient } from "@tanstack/react-query"
import AddToDoBtn from "components/common/Button/AddToDoBtn"
import BaseContainer from "components/common/Container/BaseContainer"
import EditModal from "components/page/goal/EditModal"
import GoalTodoList from "components/page/goal/GoalTodoList"
import Process from "components/page/goal/Process"
import Color from "constant/color"
import { useLocalSearchParams, useRouter } from "expo-router"
import useDeleteGoal from "hooks/goal/useDeleteGoal"
import { useGetGoalDetail } from "hooks/goal/useGetGoalDetail"
import { useTodoProgress } from "hooks/todo/useTodoProgress"

const GoalDetail = () => {
  const { slug } = useLocalSearchParams<{ slug: string }>()
  const { data } = useGetGoalDetail({ goalId: slug })
  const { data: progress } = useTodoProgress(Number(slug))
  const [isVisible, setIsVisible] = useState(false)
  const [isEditVisible, setIsEditVisible] = useState(false)
  const router = useRouter()

  const { onDeleteHanlder } = useDelete({ slug, setIsVisible })

  return (
    <>
      <ScrollView>
        <View className="p-4" style={{ gap: 16 }}>
          <BaseContainer color="white">
            <View className="flex-row justify-between items-center">
              <View className="flex-row items-center" style={{ gap: 8 }}>
                <View className="w-10 h-10 bg-slate-800 items-center justify-center rounded-[15px]">
                  <Image source={require("@/assets/images/goal/icon01.png")} />
                </View>
                <Text className="text-base font-semibold text-slate-800">{data?.title}</Text>
              </View>
              <View className="relative z-50">
                <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
                  <Ionicons name="ellipsis-vertical" size={24} color={Color.slate400} />
                </TouchableOpacity>
                {isVisible && (
                  <View className="absolute w-[106px] right-0 bg-white top-full border rounded-lg border-slate-300 z-5">
                    <TouchableOpacity onPress={() => setIsEditVisible(true)} className="py-[10]">
                      <Text className="text-center">수정하기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={onDeleteHanlder}
                      className="py-[10px] border-t border-slate-300"
                    >
                      <Text style={{ textAlign: "center" }}>삭제하기</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
            <View className="mt-6 relative -z-[5]">
              <Text className="text-sm font-semibold text-[#0F172A]">진행율</Text>
              {progress && (
                <View className="mt-2">
                  <Process progress={progress.progress} />
                </View>
              )}
            </View>
          </BaseContainer>

          <TouchableOpacity
            onPress={() => {
              router.push(`/note/list/${slug}`)
            }}
          >
            <BaseContainer
              color={Color.blue100}
              style={{
                flexDirection: "row",
                flex: 1,
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                className="flex-row items-center"
                style={{
                  gap: 8,
                }}
              >
                <Image source={require("@/assets/images/goal/note.png")} />
                <Text className="text-lg text-slate-800 font-bold">노트 모아보기</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color={Color.slate600} />
            </BaseContainer>
          </TouchableOpacity>

          <BaseContainer color="white">
            <View className="flex-row justify-between">
              <Text className="text-lg font-bold text-slate-800">To do</Text>
              <AddToDoBtn />
            </View>
            <View className="mt-4" style={{ gap: 8 }}>
              <GoalTodoList id={Number(slug)} done={false} />
            </View>
          </BaseContainer>

          <BaseContainer color={Color.slate200}>
            <View className="flex-row justify-between">
              <Text className="text-lg font-bold text-slate-800">Done</Text>
            </View>
            <View className="mt-4" style={{ gap: 8 }}>
              <GoalTodoList id={Number(slug)} done={true} />
            </View>
          </BaseContainer>
        </View>
      </ScrollView>
      <EditModal
        slug={slug}
        setIsVisible={setIsVisible}
        isEditVisible={isEditVisible}
        setIsEditVisible={setIsEditVisible}
      />
    </>
  )
}

export default GoalDetail

const useDelete = ({
  slug,
  setIsVisible,
}: {
  slug: string
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { mutate } = useDeleteGoal(queryClient, router)

  const onDeleteHanlder = () => {
    Alert.alert("삭제", "정말 삭제하시겠습니까?", [
      {
        text: "네",
        onPress: () => {
          mutate({ goalId: Number(slug) })
          setIsVisible(false)
        },
      },
      {
        text: "아니요",
      },
    ])
  }

  return { onDeleteHanlder }
}
