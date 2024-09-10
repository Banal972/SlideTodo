import { View } from "react-native"

import Process from "components/page/goal/Process"
import { useTodoProgress } from "hooks/todo/useTodoProgress"
import { IGoalProcess } from "types/dashboard"

const GoalProcess = ({ id }: IGoalProcess) => {
  const { data: progress } = useTodoProgress(id)

  return progress ? (
    <View className="mt-4">
      <Process progress={progress.progress} />
    </View>
  ) : null
}

export default GoalProcess
