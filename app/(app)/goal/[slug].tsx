import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Alert, Image, Modal, Pressable, ScrollView, Text, View } from "react-native"

import Ionicons from "@expo/vector-icons/Ionicons"
import { useQueryClient } from "@tanstack/react-query"
import Button from "components/common/Button"
import AddToDoBtn from "components/common/Button/AddToDoBtn"
import BaseContainer from "components/common/Container/BaseContainer"
import Input from "components/common/Input"
import GoalTodoList from "components/page/goal/GoalTodoList"
import Process from "components/page/goal/Process"
import Color from "constant/color"
import { Link, useLocalSearchParams, useRouter } from "expo-router"
import useDeleteGoal from "hooks/goal/useDeleteGoal"
import useEditGoal from "hooks/goal/useEditGoal"
import { useGetGoalDetail } from "hooks/goal/useGetGoalDetail"
import { useTodoProgress } from "hooks/todo/useTodoProgress"

const GoalDetail = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const { slug } = useLocalSearchParams<{ slug: string }>()
  const { data } = useGetGoalDetail({ goalId: slug })
  const { data: progress } = useTodoProgress(Number(slug))
  const [isVisible, setIsVisible] = useState(false)
  const [isEditVisible, setIsEditVisible] = useState(false)
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
                <Pressable onPress={() => setIsVisible(!isVisible)}>
                  <Ionicons name="ellipsis-vertical" size={24} color={Color.slate400} />
                </Pressable>
                {isVisible && (
                  <View className="absolute w-[106px] right-0 bg-white top-full border rounded-lg border-slate-300 z-5">
                    <Pressable onPress={() => setIsEditVisible(true)} className="py-[10]">
                      <Text className="text-center">수정하기</Text>
                    </Pressable>
                    <Pressable
                      onPress={onDeleteHanlder}
                      className="py-[10px] border-t border-slate-300"
                    >
                      <Text style={{ textAlign: "center" }}>삭제하기</Text>
                    </Pressable>
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

          <Link href={`/note/list/${slug}`} className="flex-1">
            <BaseContainer
              color={Color.blue100}
              style={{
                flex: 1,
                width: "100%",
                alignSelf: "stretch",
                justifyContent: "space-between",
                flexDirection: "row",
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
          </Link>

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
        queryClient={queryClient}
        isEditVisible={isEditVisible}
        setIsEditVisible={setIsEditVisible}
      />
    </>
  )
}

export default GoalDetail

const EditModal = ({ slug, setIsVisible, queryClient, isEditVisible, setIsEditVisible }: any) => {
  const { mutate: editMutate } = useEditGoal(queryClient, setIsEditVisible)

  const { control, handleSubmit } = useForm()

  const onSubmit = handleSubmit((data) => {
    const { title } = data

    if (!title) return Alert.alert("실패", "제목을 입력해주세요")

    editMutate({
      goalId: Number(slug),
      title,
    })

    setIsVisible(false)
  })

  return (
    <Modal visible={isEditVisible} animationType="fade" transparent>
      <View className="flex-1 bg-black/50 items-center justify-center">
        <View className="bg-white w-[95%] p-6 rounded-xl overflow-hidden">
          <View className="justify-between flex-row">
            <Text className="text-lg font-bold text-slate-800">목표 수정</Text>
            <Pressable onPress={() => setIsEditVisible(false)}>
              <Ionicons name="close" size={24} color={Color.slate500} />
            </Pressable>
          </View>
          <View className="mt-6" style={{ gap: 12 }}>
            <Text className="font-semibold text-slate-800">제목</Text>
            <Controller
              control={control}
              name="title"
              render={({ field: { onBlur, onChange, value } }) => (
                <Input
                  placeholder="제목을 입력해주세요"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />
          </View>
          <Button
            onPress={onSubmit}
            label="확인"
            style={{ marginTop: 40, backgroundColor: Color.blue500 }}
          />
        </View>
      </View>
    </Modal>
  )
}
