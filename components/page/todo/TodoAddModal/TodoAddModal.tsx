import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Alert, Modal, Pressable, SafeAreaView, ScrollView, Text, View } from "react-native"

import Ionicons from "@expo/vector-icons/Ionicons"
import { Picker } from "@react-native-picker/picker"
import { useQueryClient } from "@tanstack/react-query"
import Button from "components/common/Button"
import Input from "components/common/Input"
import Label from "components/common/Label"
import Seleted from "components/page/todo/TodoAddModal/Atom/Seleted"
import Color from "constant/color"
import { useGetGoalList } from "hooks/goal/useGetGoalList"
import usePostTodo from "hooks/todo/usePostTodo"
import useNewTodoModalStore from "store/useNewTodoModalStore"
import { TodoPostValue } from "types/todo"

const TodoAddModal = ({ isModal }: { isModal: boolean }) => {
  const queryClient = useQueryClient()
  const { close: isModalCloseHandler } = useNewTodoModalStore()
  const { control, handleSubmit, reset } = useForm<TodoPostValue>()
  const { goalLists } = useGetGoalList({ cursor: 1 })
  const [selectedGoal, setSelectedGoal] = useState()
  const [linkState, setLinkState] = useState(false)
  const [fileState, setFileState] = useState(false)

  const { mutate } = usePostTodo(queryClient, isModalCloseHandler, reset)

  const onSubmit = handleSubmit((data) => {
    if (!selectedGoal) return Alert.alert("실패", "목표를 선택해주세요")
    const datas = {
      ...data,
      goalId: Number(selectedGoal),
    }
    mutate(datas)
  })

  return (
    <Modal animationType="slide" transparent={true} visible={isModal} style={{ flex: 1 }}>
      <SafeAreaView className="flex-1 bg-white">
        <View className="py-6 px-4 border-white flex-1">
          <View className="flex-row justify-between pb-5">
            <Text className="text-lg leading-7 font-bold">할 일 생성</Text>
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
              className="flex-col flex-1 mt-6 justify-between"
              style={{
                gap: 24,
              }}
            >
              <View style={{ gap: 24 }}>
                <View>
                  <Label>자료</Label>
                  <View className="flex-row mt-3" style={{ gap: 12 }}>
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
                      className="mt-3 h-[184px] items-center justify-center bg-slate-50"
                      onPress={() => {
                        Alert.alert("미구현", "아직 미구현 상태 입니다.")
                      }}
                    >
                      <View
                        className="flex-col justify-center items-center"
                        style={{
                          gap: 5,
                        }}
                      >
                        <Ionicons name="add" size={24} color={Color.slate400} />
                        <Text className="text-slate-400 text-base">파일을 업로드해주세요</Text>
                      </View>
                    </Pressable>
                  )}
                </View>

                <View>
                  <Label>목표</Label>
                  <View className=" rounded-xl overflow-hidden mt-3">
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
                      <Picker.Item
                        style={{
                          fontSize: 14,
                          lineHeight: 20,
                        }}
                        label={"목표를 선택해주세요"}
                        value={""}
                      />
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
              <Button label="확인" onPress={onSubmit} />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </Modal>
  )
}

export default TodoAddModal
