import { Text, View } from "react-native"

import Ionicons from "@expo/vector-icons/Ionicons"
import SmallBtn from "components/common/Button/SmallBtn"
import Color from "constant/color"
import ROUTE from "constant/route"
import { Link } from "expo-router"
import useNewTodoModalStore from "store/useNewTodoModalStore"

const DashboardTap = () => {
  const { open: newModalOpenHandler } = useNewTodoModalStore()

  return (
    <View className="flex-row justify-between border border-slate-200 items-center px-4 py-3">
      <Link href={ROUTE.dashboard}>
        <View className="flex-row items-center" style={{ gap: 8 }}>
          <Ionicons name="home" size={24} color="black" />
          <Text>대시보드</Text>
        </View>
      </Link>

      <SmallBtn
        onPress={() => newModalOpenHandler({})}
        backgroundColor={Color.blue500}
        color={"#fff"}
      >
        + 새 할 일
      </SmallBtn>
    </View>
  )
}

export default DashboardTap
