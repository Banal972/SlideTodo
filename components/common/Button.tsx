import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

import Color from "constant/color"
import { IButton } from "types/global"

const Button = ({ style, label, onPress }: IButton) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.button, style]}>
        <Text style={styles.buttonText}>{label}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
  button: {
    backgroundColor: Color.slate400,
    borderRadius: 12,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "semibold",
    lineHeight: 24,
    color: "white",
  },
})
