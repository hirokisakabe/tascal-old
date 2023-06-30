import { Card, Text, Button, Flex } from "@tremor/react";
import { completeTask } from "@/lib";
import { Task } from "@/model";

export function TaskCard({ task }: { task: Task }) {
  return (
    <Card
      className="max-w-xs mx-auto"
      decoration="top"
      decorationColor="indigo"
    >
      <Flex>
        <Text>{task.title}</Text>
        {task.isCompleted ? (
          <Button variant="secondary" disabled>
            完了済
          </Button>
        ) : (
          <Button
            variant="secondary"
            onClick={() => completeTask({ id: task.id })}
          >
            完了する
          </Button>
        )}
      </Flex>
    </Card>
  );
}
