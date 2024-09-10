import { Text, TouchableOpacity } from "react-native"

import { ISmallBtn } from "types/global"

const SmallBtn = ({ onPress, style, backgroundColor, color, children }: ISmallBtn) => {
  return (
    <TouchableOpacity
      className="w-[94px] h-9 rounded-lg items-center justify-center"
      style={[style, { backgroundColor }]}
      onPress={onPress}
    >
      <Text className="text-sm font-semibold" style={[{ color }]}>
        {children}
      </Text>
    </TouchableOpacity>
  )
}

export default SmallBtn
