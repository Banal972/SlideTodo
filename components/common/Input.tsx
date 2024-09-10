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
  className,
}: IInput) => {
  return (
    <TextInput
      onBlur={onBlur}
      onChangeText={onChangeText}
      value={value}
      secureTextEntry={secureTextEntry}
      className={`bg-slate-50 text-sm leading-5 h-11 px-6 rounded-xl ${className}`}
      placeholder={placeholder}
      onSubmitEditing={onSubmitEditing}
      returnKeyType={returnKeyType}
    />
  )
}

export default Input
