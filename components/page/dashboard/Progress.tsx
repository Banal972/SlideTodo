import { useEffect, useState } from "react"
import { Image, ImageBackground, Text, View } from "react-native"
import { ProgressChart } from "react-native-chart-kit"

import { useTodoProgress } from "hooks/todo/useTodoProgress"

const Progress = () => {
  const { data: progress } = useTodoProgress()
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    if (!progress) return
    setPercent(progress.progress)
  }, [progress])

  return (
    <ImageBackground
      source={require("@/assets/images/dashboard/progressBg.png")}
      resizeMode="cover"
      className="p-4 overflow-hidden"
      imageStyle={{ borderRadius: 12 }}
    >
      <View className="py-[42px] relative">
        <View className="absolute left-0 top-0">
          <View className=" w-10 h-10 rounded-[15px] items-center justify-center bg-slate-900">
            <Image source={require("@/assets/images/dashboard/icon03.png")} />
          </View>
          <Text className="mt-4 text-base font-semibold text-white">내 진행 상황</Text>
          <View className="mt-1 items-center flex-row gap-1">
            <Text className="text-[30px] font-bold text-white">
              {progress?.progress ? progress.progress : 0}
            </Text>
            <Text className="text-base font-semibold text-white">%</Text>
          </View>
        </View>
        <View className="ml-auto">
          <ProgressChart
            height={166}
            width={166}
            data={{
              data: [percent / 100],
            }}
            strokeWidth={32}
            radius={66}
            chartConfig={{
              //배경 색
              backgroundGradientFrom: "#0000",
              backgroundGradientTo: "#0000",
              backgroundGradientFromOpacity: 0,
              backgroundGradientToOpacity: 0,

              //소수점
              decimalPlaces: 0,
              color: (opacity) => {
                return `rgba(255, 255, 255, ${opacity})`
              },
            }}
            hideLegend={true}
          />
        </View>
      </View>
    </ImageBackground>
  )
}

export default Progress
