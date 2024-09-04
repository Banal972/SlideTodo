import React from "react"
import { Pressable, Text } from "react-native"

import Ionicons from "@expo/vector-icons/Ionicons"
import Color from "constant/color"

const MoreBtn = ({ onPress }: { onPress: () => void }) => {
  return (
    <Pressable
      onPress={onPress}
      className="w-[120px] h-8 bg-white rounded-full items-center justify-center mx-auto mt-4 flex-row"
    >
      <Text className="text-sm font-semibold text-slate-700 mr-1">더보기</Text>
      <Ionicons name="chevron-down-sharp" size={16} color={Color.slate700} />
    </Pressable>
  )
}

export default MoreBtn
