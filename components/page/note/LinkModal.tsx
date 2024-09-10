import { Control, Controller } from "react-hook-form"
import { TouchableOpacity } from "react-native"
import { Text, View } from "react-native"
import { Modal } from "react-native"

import Ionicons from "@expo/vector-icons/Ionicons"
import Button from "components/common/Button"
import Input from "components/common/Input"
import Color from "constant/color"

type FormData = {
  title: string
  content: string
  linkUrl: string
}

interface ILinkModal {
  control: Control<FormData, any>
  isModal: boolean
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>
}

const LinkModal = ({ control, isModal, setIsModal }: ILinkModal) => {
  return (
    <Modal visible={isModal} animationType="fade" transparent>
      <View className="flex-1 bg-black/50 items-center justify-center">
        <View className="bg-white w-[95%] p-6 rounded-xl overflow-hidden">
          <View className="justify-between flex-row">
            <Text className="text-lg font-bold text-slate-800">링크 등록</Text>
            <TouchableOpacity onPress={() => setIsModal(false)}>
              <Ionicons name="close" size={24} color={Color.slate500} />
            </TouchableOpacity>
          </View>
          <View className="mt-8" style={{ gap: 12 }}>
            <Text className="font-semibold text-slate-800">링크 주소</Text>
            <Controller
              control={control}
              name="linkUrl"
              render={({ field: { onBlur, onChange, value } }) => (
                <Input
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="링크 주소를 입력해주세요"
                />
              )}
            />
          </View>
          <Button
            onPress={() => setIsModal(false)}
            label="확인"
            style={{ marginTop: 40, backgroundColor: Color.blue500 }}
          />
        </View>
      </View>
    </Modal>
  )
}

export default LinkModal
