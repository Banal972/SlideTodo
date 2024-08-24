import { ScrollView, StyleSheet, Text, View } from "react-native"

import GoalList from "@/components/page/dashboard/GoalList"
import Progress from "@/components/page/dashboard/Progress"
import TodoList from "@/components/page/dashboard/TodoList"

const DashboardPage = () => {
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

export default DashboardPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
})
