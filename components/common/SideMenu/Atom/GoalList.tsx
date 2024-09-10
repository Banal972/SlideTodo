import React from "react"
import { Text, View } from "react-native"

import { Link } from "expo-router"
import { useGetGoalList } from "hooks/goal/useGetGoalList"

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
          <Text key={goalList.id} className="text-base font-medium">
            <Link href={`/goal/${goalList.id}`}>· {goalList.title}</Link>
          </Text>
        ))}
    </View>
  )
}

export default GoalList
