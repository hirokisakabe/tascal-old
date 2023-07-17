import { TaskBox } from "./task-box";
import { completeTask } from "@/lib";
import { Task } from "@/model";

type Props = { task: Task };

export function TaskBoxContainer(props: Props) {
  const { task } = props;

  return <TaskBox task={task} completeTask={completeTask} />;
}
