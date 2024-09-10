import React from "react"
import { Text, TouchableOpacity } from "react-native"

import Ionicons from "@expo/vector-icons/Ionicons"
import Color from "constant/color"
import { TMoreBtn } from "types/global"

const MoreBtn = ({ onPress }: TMoreBtn) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="w-[120px] h-8 bg-white rounded-full items-center justify-center mx-auto mt-4 flex-row"
    >
      <Text className="text-sm font-semibold text-slate-700 mr-1">더보기</Text>
      <Ionicons name="chevron-down-sharp" size={16} color={Color.slate700} />
    </TouchableOpacity>
  )
}

export default MoreBtn
