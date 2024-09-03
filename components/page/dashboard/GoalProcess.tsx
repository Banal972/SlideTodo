import Process from "components/page/goal/Process"
import { useTodoProgress } from "hooks/todo/useTodoProgress"

const GoalProcess = ({ id }: { id: number }) => {
  const { data: progress } = useTodoProgress(id)

  return progress ? <Process progress={progress.progress} /> : null
}

export default GoalProcess
