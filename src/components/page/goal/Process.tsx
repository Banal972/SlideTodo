import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Color from "@/constant/color";

const Process = () => {
  return (
    <View style={styles.processContainer}>
      <View style={styles.processBox}>
        <View style={styles.processLine} />
      </View>
      <Text style={styles.processPercent}>64%</Text>
    </View>
  );
};

export default Process;

const styles = StyleSheet.create({
  processContainer: {
    marginTop: 8,
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
    width: "50%",
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
});
