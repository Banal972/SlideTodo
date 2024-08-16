import Color from "@/constant/color";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";

const Button = ({
  style,
  label,
}: {
  style?: StyleProp<ViewStyle>;
  label: string;
}) => {
  return (
    <Pressable>
      <View style={[styles.button, style]}>
        <Text style={styles.buttonText}>{label}</Text>
      </View>
    </Pressable>
  );
};

export default Button;

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
});
