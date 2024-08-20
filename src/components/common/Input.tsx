import Color from "@/constant/color";
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputFocusEventData,
} from "react-native";

const Input = ({
  placeholder,
  secureTextEntry,
  onBlur,
  onChangeText,
  value,
}: {
  onBlur?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onChangeText?: (text: string) => void;
  value?: string;
  placeholder: string;
  secureTextEntry?: boolean;
}) => {
  return (
    <TextInput
      onBlur={onBlur}
      onChangeText={onChangeText}
      value={value}
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
