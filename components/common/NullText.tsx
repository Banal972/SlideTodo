import { ReactNode } from "react"
import { Text } from "react-native"

const NullText = ({ children }: { children: ReactNode }) => {
  return <Text className="text-center text-sm text-slate-500 py-[30px] pb-[60px]">{children}</Text>
}

export default NullText
