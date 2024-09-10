import { Text } from "react-native"

import { ChildrenProps } from "types/global"

const Label = ({ children }: ChildrenProps) => {
  return <Text className="text-base leading-6 font-semibold text-slate-900">{children}</Text>
}

export default Label
