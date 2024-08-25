import React, { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import {
  Alert,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native"

import Button from "@/components/common/Button"
import Input from "@/components/common/Input"
import Label from "@/components/common/Label"
import Seleted from "@/components/page/todo/TodoAddModal/Atom/Seleted"
import Color from "@/constant/color"
import { useGetGoalList } from "@/hooks/goal/useGetGoalList"
import axiosInstance from "@/libs/axiosInstance"
import useNewTodoModalStore from "@/store/useNewTodoModalStore"
import Ionicons from "@expo/vector-icons/Ionicons"
import { Picker } from "@react-native-picker/picker"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const TodoAddModal = ({ isModal }: { isModal: boolean }) => {
  const queryClient = useQueryClient()
  const { close: isModalCloseHandler } = useNewTodoModalStore()
  const { goalLists } = useGetGoalList({ cursor: 1 })
  const { control, handleSubmit } = useForm()
  const [selectedGoal, setSelectedGoal] = useState()
  const [linkState, setLinkState] = useState(false)
  const [fileState, setFileState] = useState(false)

  const { mutate } = useMutation({
    mutationFn: (data: any) => {
      const { title, fileUrl, linkUrl, goalId } = data
      return axiosInstance.post("/todos", {
        title: title,
        fileUrl: fileUrl,
        linkUrl: linkUrl,
        goalId: goalId,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] })
      Alert.alert("투두", "작성 하였습니다.", [
        {
          text: "확인",
          onPress: () => isModalCloseHandler(),
        },
      ])
    },
    onError: (error: any) => {
      const { message } = error.response.data
      Alert.alert("실패", message)
    },
  })

  const onSubmit = (data: any) => {
    const datas = {
      ...data,
      goalId: selectedGoal,
    }
    mutate(datas)
  }

  return (
    <Modal animationType="slide" transparent={true} visible={isModal} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={styles.modalContainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingBottom: 20,
            }}
          >
            <Text style={{ fontSize: 18, lineHeight: 28, fontWeight: "bold" }}>할 일 생성</Text>
            <Pressable onPress={isModalCloseHandler}>
              <Ionicons name="close" size={24} color="black" />
            </Pressable>
          </View>
          <ScrollView style={{ flex: 1 }}>
            <View>
              <Label>제목</Label>
              <Controller
                control={control}
                name="title"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder="할 일의 제목을 적어주세요."
                  />
                )}
              />
            </View>

            <View
              style={{
                flexDirection: "column",
                gap: 24,
                flex: 1,
                marginTop: 24,
                justifyContent: "space-between",
              }}
            >
              <View style={{ gap: 24 }}>
                <View>
                  <Label>자료</Label>
                  <View style={{ flexDirection: "row", gap: 12, marginTop: 12 }}>
                    <Seleted state={fileState} setState={setFileState} label="파일 업로드" />
                    <Seleted state={linkState} setState={setLinkState} label="링크 첨부" />
                  </View>

                  {linkState && (
                    <View>
                      <Controller
                        control={control}
                        name="linkUrl"
                        render={({ field: { onChange, onBlur, value } }) => (
                          <Input
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            placeholder="링크 주소를 입력해주세요"
                          />
                        )}
                      />
                    </View>
                  )}

                  {fileState && (
                    <Pressable
                      style={{
                        marginTop: 12,
                        height: 184,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: Color.slate50,
                      }}
                      onPress={() => {
                        Alert.alert("미구현", "아직 미구현 상태 입니다.")
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "column",
                          gap: 5,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Ionicons name="add" size={24} color={Color.slate400} />
                        <Text style={{ color: Color.slate400, fontSize: 16 }}>
                          파일을 업로드해주세요
                        </Text>
                      </View>
                    </Pressable>
                  )}
                </View>

                <View>
                  <Label>목표</Label>
                  <View
                    style={{
                      borderRadius: 12,
                      overflow: "hidden",
                      marginTop: 12,
                    }}
                  >
                    <Picker
                      style={{
                        backgroundColor: Color.slate50,
                      }}
                      itemStyle={{
                        fontSize: 14,
                        lineHeight: 20,
                      }}
                      selectedValue={selectedGoal}
                      onValueChange={(itemValue) => setSelectedGoal(itemValue)}
                    >
                      {goalLists?.goals.map((goal) => (
                        <Picker.Item
                          key={goal.id}
                          style={{
                            fontSize: 14,
                            lineHeight: 20,
                          }}
                          label={goal.title}
                          value={goal.id}
                        />
                      ))}
                    </Picker>
                  </View>
                </View>
              </View>
              <Button label="확인" onPress={handleSubmit(onSubmit)} />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </Modal>
  )
}

export default TodoAddModal

const styles = StyleSheet.create({
  modalContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    borderColor: "#fff",
    flex: 1,
  },
})
