import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Alert, Image, Modal, Pressable, StyleSheet, Text, View } from "react-native"

import Ionicons from "@expo/vector-icons/Ionicons"
import { useQueryClient } from "@tanstack/react-query"
import Button from "components/common/Button"
import AddToDoBtn from "components/common/Button/AddToDoBtn"
import BaseContainer from "components/common/Container/BaseContainer"
import Input from "components/common/Input"
import Process from "components/page/goal/Process"
import TodoDoneList from "components/page/goal/TodoDoneList"
import TodoList from "components/page/goal/TodoList"
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
  const { mutate: editMutate } = useEditGoal(queryClient, setIsEditVisible)

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
    <>
      <View style={styles.rootContainer}>
        <BaseContainer color="white">
          <View style={styles.goalCotainer}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <View style={styles.goalIcon}>
                <Image source={require("@/assets/images/goal/icon01.png")} />
              </View>
              <Text style={styles.goalTitle}>{data?.title}</Text>
            </View>
            <View style={{ position: "relative" }}>
              <Pressable onPress={() => setIsVisible(!isVisible)}>
                <Ionicons name="ellipsis-vertical" size={24} color={Color.slate400} />
              </Pressable>
              {isVisible && (
                <View
                  style={{
                    position: "absolute",
                    width: 106,
                    right: 0,
                    backgroundColor: "white",
                    top: "100%",
                    borderWidth: 1,
                    borderRadius: 12,
                    borderColor: Color.slate300,
                    zIndex: 10,
                  }}
                >
                  <Pressable onPress={() => setIsEditVisible(true)} style={{ paddingVertical: 10 }}>
                    <Text style={{ textAlign: "center" }}>수정하기</Text>
                  </Pressable>
                  <Pressable
                    onPress={onDeleteHanlder}
                    style={{ paddingVertical: 10, borderTopWidth: 1, borderColor: Color.slate300 }}
                  >
                    <Text style={{ textAlign: "center" }}>삭제하기</Text>
                  </Pressable>
                </View>
              )}
            </View>
          </View>
          <View style={{ marginTop: 24 }}>
            <Text style={{ fontSize: 12, fontWeight: "600", color: "#0F172A" }}>진행율</Text>
            {progress && <Process progress={progress.progress} />}
          </View>
        </BaseContainer>

        <BaseContainer color={Color.blue100}>
          <Link
            href={`/note/list/${slug}`}
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <View
              style={{
                gap: 8,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
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
            <TodoList id={Number(slug)} goalTitle={data?.title || ""} />
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
            <TodoDoneList id={Number(slug)} goalTitle={data?.title || ""} />
          </View>
        </BaseContainer>
      </View>
      <Modal visible={isEditVisible} animationType="fade" transparent>
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(000,000,000,0.5)",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              width: "95%",
              padding: 24,
              borderRadius: 12,
              overflow: "hidden",
            }}
          >
            <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
              <Text style={{ fontSize: 18, fontWeight: "bold", color: Color.slate800 }}>
                목표 수정
              </Text>
              <Pressable>
                <Ionicons name="close" size={24} color={Color.slate500} />
              </Pressable>
            </View>
            <View style={{ gap: 12, marginTop: 24 }}>
              <Text style={{ fontWeight: "600", color: Color.slate800 }}>제목</Text>
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
    </>
  )
}

export default GoalDetail

const styles = StyleSheet.create({
  rootContainer: {
    padding: 16,
    gap: 16,
  },
  goalCotainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  goalIcon: {
    width: 40,
    height: 40,
    backgroundColor: Color.slate800,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Color.slate800,
  },
})
