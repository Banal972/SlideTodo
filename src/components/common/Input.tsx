import Color from "@/constant/color";
import { StyleSheet, TextInput } from "react-native";

const Input = ({
  placeholder,
  secureTextEntry,
}: {
  placeholder: string;
  secureTextEntry?: boolean;
}) => {
  return (
    <TextInput
      secureTextEntry={secureTextEntry}
      style={styles.textInput}
      placeholder={placeholder}
    />
  );
};

export default Input;

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: Color.slate50,
    marginTop: 12,
    fontSize: 14,
    lineHeight: 20,
    height: 44,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
});
