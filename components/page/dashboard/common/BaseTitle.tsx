import { Image, ImageSourcePropType, Text, View } from "react-native"

import Octicons from "@expo/vector-icons/Octicons"
import { Link } from "expo-router"

const BaseTitle = ({
  baseIcon,
  title,
  linkURL,
}: {
  baseIcon: {
    color?: string
    source?: ImageSourcePropType
  }
  title?: string
  linkURL?: string
}) => {
  return (
    <View className="flex-row justify-between items-center">
      <View className="flex-row items-center" style={{ gap: 8 }}>
        <View
          className="w-10 h-10 rounded-[15px] relative"
          style={[{ backgroundColor: baseIcon.color }]}
        >
          {baseIcon.source && (
            <View className="absolute w-full h-full items-center justify-center">
              <Image source={baseIcon.source} />
            </View>
          )}
        </View>
        <Text className="text-slate-800 text-base leading-6 font-semibold">{title}</Text>
      </View>
      {linkURL && (
        <Link href={"/alltodo"}>
          <View className="text-center flex-row" style={{ gap: 10 }}>
            <Text className="text-[#4B5563] text-sm font-medium">모두 보기</Text>
            <Octicons name="chevron-right" size={16} color="#4B5563" />
          </View>
        </Link>
      )}
    </View>
  )
}

export default BaseTitle
