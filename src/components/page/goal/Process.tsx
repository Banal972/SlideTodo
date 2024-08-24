import React from "react"
import { StyleSheet, Text, View } from "react-native"

import Color from "@/constant/color"

const Process = ({ progress }: { progress: number }) => {
  return (
    <View style={styles.processContainer}>
      <View style={styles.processBox}>
        <View style={[styles.processLine]} />
      </View>
      <Text style={styles.processPercent}>{progress}%</Text>
    </View>
  )
}

export default Process

const styles = StyleSheet.create({
  processContainer: {
    marginTop: 16,
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
    width: "0%",
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
