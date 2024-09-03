import { StyleSheet, Text, View } from "react-native"

import Ionicons from "@expo/vector-icons/Ionicons"
import SmallBtn from "components/common/Button/SmallBtn"
import Color from "constant/color"
import ROUTE from "constant/route"
import { Link } from "expo-router"
import useNewTodoModalStore from "store/useNewTodoModalStore"

const DashboardTap = () => {
  const { open: newModalOpenHandler } = useNewTodoModalStore()

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: Color.slate200,
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 12,
      }}
    >
      <Link href={ROUTE.dashboard}>
        <View style={styles.listBtnContainer}>
          <Ionicons name="home" size={24} color="black" />
          <Text>대시보드</Text>
        </View>
      </Link>

      <SmallBtn onPress={newModalOpenHandler} backgroundColor={Color.blue500} color={"#fff"}>
        + 새 할 일
      </SmallBtn>
    </View>
  )
}

export default DashboardTap

const styles = StyleSheet.create({
  listBtnContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: "500",
  },
})
