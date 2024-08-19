import { View, Text, StyleSheet, ScrollView } from "react-native";
import Color from "@/constant/color";
import BaseContainer from "@/components/common/Container/BaseContainer";
import TodoList from "@/components/page/dashboard/TodoList";
import GoalList from "@/components/page/dashboard/GoalList";

const Dashboard = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <TodoList />
        <BaseContainer color={Color.blue50}>
          <Text>asdasdasd</Text>
        </BaseContainer>
        <GoalList />
      </View>
    </ScrollView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
});
