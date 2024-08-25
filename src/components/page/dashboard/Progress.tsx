import React from "react"
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native"

import Color from "@/constant/color"
import { useTodoProgress } from "@/hooks/todo/useTodoProgress"

const Progress = () => {
  const { data: progress } = useTodoProgress({})

  return (
    <ImageBackground
      source={require("@/assets/images/dashboard/progressBg.png")}
      resizeMode="cover"
      style={styles.background}
      imageStyle={styles.backgroundImg}
    >
      <View>
        <View style={styles.icon}>
          <Image source={require("@/assets/images/dashboard/icon03.png")} />
        </View>
        <Text style={styles.smallText}>내 진행 상황</Text>
        <View style={styles.progressContainer}>
          <Text style={styles.progressNumber}>{progress?.progress}</Text>
          <Text style={styles.percent}>%</Text>
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
