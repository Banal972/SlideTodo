import { Controller, useForm } from "react-hook-form"
import { Alert, Modal, Text, TouchableOpacity, View } from "react-native"

import Ionicons from "@expo/vector-icons/Ionicons"
import { useQueryClient } from "@tanstack/react-query"
import Button from "components/common/Button"
import Input from "components/common/Input"
import Color from "constant/color"
import useEditGoal from "hooks/goal/useEditGoal"
import { IEditModal } from "types/goal"

const EditModal = ({ slug, setIsVisible, isEditVisible, setIsEditVisible }: IEditModal) => {
  const { onSubmit, control } = useEdit({ slug, setIsVisible, setIsEditVisible })

  return (
    <Modal visible={isEditVisible} animationType="fade" transparent>
      <View className="flex-1 bg-black/50 items-center justify-center">
        <View className="bg-white w-[95%] p-6 rounded-xl overflow-hidden">
          <View className="justify-between flex-row">
            <Text className="text-lg font-bold text-slate-800">목표 수정</Text>
            <TouchableOpacity onPress={() => setIsEditVisible(false)}>
              <Ionicons name="close" size={24} color={Color.slate500} />
            </TouchableOpacity>
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

export default EditModal

const useEdit = ({
  slug,
  setIsVisible,
  setIsEditVisible,
}: Pick<IEditModal, "slug" | "setIsEditVisible" | "setIsVisible">) => {
  const queryClient = useQueryClient()

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

  return { onSubmit, control }
}
