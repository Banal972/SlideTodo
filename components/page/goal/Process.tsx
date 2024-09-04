import { useEffect, useRef, useState } from "react"
import { Animated, Easing, StyleSheet, Text, View } from "react-native"

import Color from "constant/color"

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
    <View style={styles.processContainer}>
      <View style={styles.processBox}>
        <Animated.View
          style={[
            styles.processLine,
            {
              width: widthAnimation.interpolate({
                inputRange: [0, 100],
                outputRange: ["0%", "100%"],
              }),
            },
          ]}
        />
      </View>
      <Text style={styles.processPercent}>{progress || 0}%</Text>
    </View>
  )
}

export default Process

const styles = StyleSheet.create({
  processContainer: {
    gap: 8,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 9,
    paddingVertical: 2,
    borderRadius: 100,
  },
  processBox: {
    position: "relative",
    flex: 1,
    height: 4,
    borderRadius: 6,
    backgroundColor: Color.slate100,
  },
  processLine: {
    position: "absolute",
    height: "100%",
    borderRadius: 6,
    top: 0,
    left: 0,
    backgroundColor: Color.slate900,
  },
  processPercent: {
    color: "#0F172A",
    fontSize: 12,
    fontWeight: "600",
  },
})
