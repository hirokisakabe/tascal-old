import { Card, Text, Button } from "@tremor/react";
import { completeTask } from "@/lib";
import { Task } from "@/model";

export function TaskCard({ task }: { task: Task }) {
  return (
    <Card className="max-w-xs mx-auto">
      <div className="flex justify-end">
        <div className="w-full">
          <Text>{task.title}</Text>
          <Text>{task.targetDate || "-"}</Text>
        </div>
        <div className="w-fit">
          {task.isCompleted ? (
            <Button size="xs" variant="secondary" disabled>
              完了済
            </Button>
          ) : (
            <Button
              size="xs"
              variant="secondary"
              onClick={() => completeTask({ id: task.id })}
            >
              完了する
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
