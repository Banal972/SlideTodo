import { ScrollView, StyleSheet, Text, View } from "react-native"

import GoalList from "@/components/page/dashboard/GoalList"
import Progress from "@/components/page/dashboard/Progress"
import TodoList from "@/components/page/dashboard/TodoList"

const DashboardScreen = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <TodoList />
        {/* <Progress /> */}
        <GoalList />
      </View>
    </ScrollView>
  )
}

export default DashboardScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
})
