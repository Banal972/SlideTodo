import { Text, View } from "react-native"

import { Link } from "expo-router"
import { IBottomLink } from "types/auth"

const BottomLink = ({ label, linkHref, linkLabel }: IBottomLink) => {
  return (
    <View
      className="flex-row items-center mt-10 justify-center"
      style={{
        gap: 4,
      }}
    >
      <Text className="text-center text-slate-800 text-sm font-medium">{label}</Text>
      <Link href={linkHref} className="text-[#3182F6] font-medium text-sm">
        {linkLabel}
      </Link>
    </View>
  )
}

export default BottomLink
