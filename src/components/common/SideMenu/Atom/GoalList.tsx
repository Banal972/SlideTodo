import React from "react"
import { StyleSheet, Text, View } from "react-native"

import { useGetGoalList } from "@/hooks/goal/useGetGoalList"
import { Link } from "expo-router"

const GoalList = () => {
  const { goalLists } = useGetGoalList({ cursor: 1 })

  return (
    <View
      style={{
        marginTop: 20,
        gap: 20,
      }}
    >
      {goalLists &&
        goalLists.goals.map((goalList) => (
          <Text key={goalList.id} style={styles.listTitle}>
            <Link href={`/goal/${goalList.id}`}>· {goalList.title}</Link>
          </Text>
        ))}
    </View>
  )
}

export default GoalList

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
