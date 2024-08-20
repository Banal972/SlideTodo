import { ReactNode } from "react"
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native"

const BaseContainer = ({
  children,
  color,
  style,
}: {
  children?: ReactNode
  color?: string
  style?: StyleProp<ViewStyle>
}) => {
  return <View style={[{ backgroundColor: color }, styles.baseContainer, style]}>{children}</View>
}

export default BaseContainer

const styles = StyleSheet.create({
  baseContainer: {
    borderRadius: 12,
    padding: 16,
    overflow: "hidden",
  },
})
