import { StyleSheet, TextInput } from "react-native"

import Color from "constant/color"
import { IInput } from "types/global"

const Input = ({
  placeholder,
  secureTextEntry,
  onBlur,
  onChangeText,
  value,
  returnKeyType,
  onSubmitEditing,
}: IInput) => {
  return (
    <TextInput
      onBlur={onBlur}
      onChangeText={onChangeText}
      value={value}
      secureTextEntry={secureTextEntry}
      style={styles.textInput}
      placeholder={placeholder}
      onSubmitEditing={onSubmitEditing}
      returnKeyType={returnKeyType}
    />
  )
}

export default Input

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: Color.slate50,
    fontSize: 14,
    lineHeight: 20,
    height: 44,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
})
