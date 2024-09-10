import { TextInput } from "react-native"

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
      className="text-slate-50 text-sm leading-5 h-11 px-6 rounded-xl"
      placeholder={placeholder}
      onSubmitEditing={onSubmitEditing}
      returnKeyType={returnKeyType}
    />
  )
}

export default Input
