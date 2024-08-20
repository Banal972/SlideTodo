import { ReactNode } from "react"
import {
  GestureResponderEvent,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native"

const SmallBtn = ({
  onPress,
  style,
  backgroundColor,
  color,
  children,
}: {
  onPress?: (event: GestureResponderEvent) => void
  style?: StyleProp<ViewStyle>
  backgroundColor?: string
  color?: string
  children?: ReactNode
}) => {
  return (
    <Pressable style={[styles.listBtn, style, { backgroundColor }]} onPress={onPress}>
      <Text style={[styles.listBtnText, { color }]}>{children}</Text>
    </Pressable>
  )
}

export default SmallBtn

const styles = StyleSheet.create({
  listBtn: {
    width: 94,
    height: 36,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  listBtnText: {
    fontSize: 14,
    fontWeight: "600",
  },
})
