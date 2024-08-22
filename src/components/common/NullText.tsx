import { ReactNode } from "react"
import { StyleSheet, Text } from "react-native"

import Color from "@/constant/color"

const NullText = ({ children }: { children: ReactNode }) => {
  return <Text style={styles.text}>{children}</Text>
}

export default NullText

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    fontSize: 14,
    color: Color.slate500,
    paddingTop: 30,
    paddingBottom: 60,
  },
})
