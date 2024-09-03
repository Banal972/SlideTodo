import { ScrollView, View } from "react-native"

import GoalList from "components/page/dashboard/GoalList"
import Progress from "components/page/dashboard/Progress"
import TodoList from "components/page/dashboard/TodoList"

const DashboardPage = () => {
  return (
    <ScrollView>
      <View className="p-4 flex-1" style={{ gap: 16 }}>
        <TodoList />
        <Progress />
        <GoalList />
      </View>
    </ScrollView>
  )
}

export default DashboardPage
