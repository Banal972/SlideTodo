import React, { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { StyleSheet, Text, View } from "react-native"

import Ionicons from "@expo/vector-icons/Ionicons"
import { useQueryClient } from "@tanstack/react-query"
import SmallBtn from "components/common/Button/SmallBtn"
import Input from "components/common/Input"
import Color from "constant/color"
import PostGoalLists from "hooks/goal/PostGoalLists"
import { PostGoalType } from "types/goal"

const GoalInput = () => {
  const queryClient = useQueryClient()

  const [isGoalInput, setIsGoalInput] = useState(false)
  const { control, handleSubmit, setValue } = useForm<PostGoalType>()

  const { mutate } = PostGoalLists(queryClient)

  const isGoalHandler = () => {
    setIsGoalInput(!isGoalInput)
  }

  const onAddGoalSubmit = handleSubmit((data) => {
    mutate(data)
    setValue("goal", "")
    setIsGoalInput(false)
  })

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={styles.listBtnContainer}>
          <Ionicons name="flag" size={24} color="black" />
          <Text>목표</Text>
        </View>
        <SmallBtn
          onPress={isGoalHandler}
          style={{
            backgroundColor: "white",
            borderWidth: 1,
            borderColor: Color.blue500,
          }}
          color={Color.blue500}
        >
          + 새 목표
        </SmallBtn>
      </View>

      {isGoalInput && (
        <View>
          <Controller
            control={control}
            name="goal"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="목표를 입력해주세요"
                onSubmitEditing={onAddGoalSubmit}
                returnKeyType="done"
              />
            )}
          />
        </View>
      )}
    </>
  )
}

export default GoalInput

const styles = StyleSheet.create({
  listBtnContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: "500",
  },
})
