export type TMoreBtn = {
  onPress: () => void
}

export interface IBaseContainer {
  children?: ReactNode
  color?: string
  style?: StyleProp<ViewStyle>
  className?: string
}

export interface ISmallBtn {
  onPress?: (event: GestureResponderEvent) => void
  style?: StyleProp<ViewStyle>
  backgroundColor?: string
  color?: string
  children?: ReactNode
}

export interface IButton {
  style?: StyleProp<ViewStyle>
  label: string
  onPress?: (event: GestureResponderEvent) => void
}

export interface IInput {
  onBlur?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void
  onChangeText?: (text: string) => void
  value?: string
  placeholder: string
  secureTextEntry?: boolean
  returnKeyType?: ReturnKeyTypeOptions | undefined
  onSubmitEditing?: (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void
}

export type ChildrenProps = {
  children: ReactNode
}
