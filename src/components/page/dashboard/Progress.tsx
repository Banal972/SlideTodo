import { View, Text, ImageBackground, Image, StyleSheet } from "react-native";
import React from "react";
import Color from "@/constant/color";

const Progress = () => {
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
          <Text style={styles.progressNumber}>74</Text>
          <Text style={styles.percent}>%</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Progress;

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
});
