import React from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"

import Color from "@/constant/color"
import Checkbox from "expo-checkbox"

interface SeletedType {
  state: boolean
  setState: (value: React.SetStateAction<boolean>) => void
  label: string
}

const Seleted = ({ state, setState, label }: SeletedType) => {
  return (
    <Pressable
      onPress={() => setState(!state)}
      style={[styles.pressableStyle, { backgroundColor: !state ? Color.slate100 : Color.slate900 }]}
    >
      <Checkbox value={state} color={Color.blue500} style={styles.checkboxStyle} />
      <Text
        style={[
          styles.textStyle,
          {
            color: !state ? Color.slate800 : "#fff",
          },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  )
}

export default Seleted

const styles = StyleSheet.create({
  pressableStyle: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 4,
    paddingHorizontal: 8,
    height: 40,
    borderRadius: 8,
  },
  checkboxStyle: {
    borderColor: Color.slate200,
    width: 18,
    height: 18,
    borderRadius: 6,
    backgroundColor: "#fff",
  },
  textStyle: {
    fontWeight: "500",
    fontSize: 16,
  },
})
