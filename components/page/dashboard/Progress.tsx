import { useEffect, useState } from "react"
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native"
import { ProgressChart } from "react-native-chart-kit"

import Color from "constant/color"
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
      style={styles.background}
      imageStyle={styles.backgroundImg}
    >
      <View style={{ paddingVertical: 42, position: "relative" }}>
        <View
          style={{
            position: "absolute",
            left: 0,
            top: 0,
          }}
        >
          <View style={styles.icon}>
            <Image source={require("@/assets/images/dashboard/icon03.png")} />
          </View>
          <Text style={styles.smallText}>내 진행 상황</Text>
          <View style={styles.progressContainer}>
            <Text style={styles.progressNumber}>{progress?.progress}</Text>
            <Text style={styles.percent}>%</Text>
          </View>
        </View>
        <View style={{ marginLeft: "auto" }}>
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

const styles = StyleSheet.create({
  background: {
    padding: 16,
    overflow: "hidden",
  },
  backgroundImg: {
    borderRadius: 12,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 15,
    backgroundColor: Color.slate900,
    alignItems: "center",
    justifyContent: "center",
  },
  smallText: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
  progressContainer: {
    marginTop: 4,
    alignItems: "center",
    flexDirection: "row",
    gap: 4,
  },
  progressNumber: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  percent: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
})
