import { useEffect, useState } from "react"
import { Animated, Easing, Text, View } from "react-native"

const Process = ({ progress }: { progress: number }) => {
  const [widthAnimation] = useState(new Animated.Value(0))

  useEffect(() => {
    Animated.timing(widthAnimation, {
      toValue: progress,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: false,
      delay: 100,
    }).start()
  }, [progress])

  return (
    <View
      className="bg-white flex-row items-center px-[9px] py-[2px] rounded-full"
      style={{ gap: 8 }}
    >
      <View className="relative flex-1 h-1 rounded-md bg-slate-100">
        <Animated.View
          className="absolute h-full rounded-md top-0 left-0 bg-slate-900"
          style={[
            {
              width: widthAnimation.interpolate({
                inputRange: [0, 100],
                outputRange: ["0%", "100%"],
              }),
            },
          ]}
        />
      </View>
      <Text className="text-[#0F172A] text-xs font-semibold">{progress || 0}%</Text>
    </View>
  )
}

export default Process
