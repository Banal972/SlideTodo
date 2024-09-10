import React, { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Text, View } from "react-native"

import Ionicons from "@expo/vector-icons/Ionicons"
import { useQueryClient } from "@tanstack/react-query"
import SmallBtn from "components/common/Button/SmallBtn"
import Input from "components/common/Input"
import Color from "constant/color"
import PostGoalLists from "hooks/goal/PostGoalLists"
import { PostGoalType } from "types/goal"

const GoalInput = () => {
  const { isGoalInput, setIsGoalInput, isGoalHandler } = useGoalInput()

  const { control, onAddGoalSubmit } = useSubmit({ setIsGoalInput })

  return (
    <>
      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center" style={{ gap: 8 }}>
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

const useGoalInput = () => {
  const [isGoalInput, setIsGoalInput] = useState(false)

  const isGoalHandler = () => {
    setIsGoalInput(!isGoalInput)
  }

  return { isGoalInput, setIsGoalInput, isGoalHandler }
}

const useSubmit = ({
  setIsGoalInput,
}: {
  setIsGoalInput: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const queryClient = useQueryClient()

  const { control, handleSubmit, setValue } = useForm<PostGoalType>()

  const { mutate } = PostGoalLists(queryClient)

  const onAddGoalSubmit = handleSubmit((data) => {
    mutate(data)
    setValue("goal", "")
    setIsGoalInput(false)
  })

  return { control, onAddGoalSubmit }
}
