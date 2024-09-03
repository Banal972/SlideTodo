import {
  NativeSyntheticEvent,
  ReturnKeyTypeOptions,
  StyleSheet,
  TextInput,
  TextInputFocusEventData,
  TextInputSubmitEditingEventData,
} from "react-native"

import Color from "constant/color"

const Input = ({
  placeholder,
  secureTextEntry,
  onBlur,
  onChangeText,
  value,
  returnKeyType,
  onSubmitEditing,
}: {
  onBlur?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void
  onChangeText?: (text: string) => void
  value?: string
  placeholder: string
  secureTextEntry?: boolean
  returnKeyType?: ReturnKeyTypeOptions | undefined
  onSubmitEditing?: (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void
}) => {
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
    marginTop: 12,
    fontSize: 14,
    lineHeight: 20,
    height: 44,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
})
