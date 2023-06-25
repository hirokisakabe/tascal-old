import { Card, Text } from "@tremor/react";

export function TaskCard({ title }: { title: string }) {
  return (
    <Card
      className="max-w-xs mx-auto"
      decoration="top"
      decorationColor="indigo"
    >
      <Text>{title}</Text>
    </Card>
  );
}
