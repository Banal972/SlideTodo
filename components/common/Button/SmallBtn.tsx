import { ReactNode } from "react"
import { GestureResponderEvent, StyleProp, Text, TouchableOpacity, ViewStyle } from "react-native"

interface ISmallBtn {
  onPress?: (event: GestureResponderEvent) => void
  style?: StyleProp<ViewStyle>
  backgroundColor?: string
  color?: string
  children?: ReactNode
}

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
