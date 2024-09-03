import { ReactNode } from "react"
import { StyleProp, View, ViewStyle } from "react-native"

const BaseContainer = ({
  children,
  color,
  style,
  className,
}: {
  children?: ReactNode
  color?: string
  style?: StyleProp<ViewStyle>
  className?: string
}) => {
  return (
    <View
      className={`${className} rounded-2xl p-4 overflow-hidden`}
      style={[{ backgroundColor: color }, style]}
    >
      {children}
    </View>
  )
}

export default BaseContainer
