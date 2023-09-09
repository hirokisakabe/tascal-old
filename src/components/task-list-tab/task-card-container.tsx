import { TaskCard } from "./task-card";
import { completeTask } from "@/lib";
import { Task } from "@/model";

type Props = { task: Task };

export function TaskCardContainer(props: Props) {
  const { task } = props;

  return <TaskCard task={task} completeTask={completeTask} />;
}
