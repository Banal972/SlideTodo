import { Text } from "react-native"

import { ChildrenProps } from "types/global"

const NullText = ({ children }: ChildrenProps) => {
  return <Text className="text-center text-sm text-slate-500 py-[30px] pb-[60px]">{children}</Text>
}

export default NullText
