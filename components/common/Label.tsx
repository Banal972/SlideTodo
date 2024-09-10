import { StyleSheet, Text } from "react-native"

import Color from "constant/color"
import { ChildrenProps } from "types/global"

const Label = ({ children }: ChildrenProps) => {
  return <Text style={styles.textInputLabel}>{children}</Text>
}

export default Label

const styles = StyleSheet.create({
  textInputLabel: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
    color: Color.slate900,
  },
})
