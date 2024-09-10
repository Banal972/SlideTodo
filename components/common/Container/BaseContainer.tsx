import { View } from "react-native"

import { IBaseContainer } from "types/global"

const BaseContainer = ({ children, color, style, className }: IBaseContainer) => {
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
