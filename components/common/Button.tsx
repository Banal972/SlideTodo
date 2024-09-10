import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native"

import Color from "constant/color"

const Button = ({
  style,
  label,
  onPress,
}: {
  style?: StyleProp<ViewStyle>
  label: string
  onPress?: (event: GestureResponderEvent) => void
}) => {
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
