import { Text, TouchableOpacity, View } from "react-native"

import { IButton } from "types/global"

const Button = ({ style, label, onPress }: IButton) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View className=" bg-slate-400 rounded-xl items-center justify-center h-12" style={[style]}>
        <Text className="text-base font-semibold leading-6 text-white">{label}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default Button
