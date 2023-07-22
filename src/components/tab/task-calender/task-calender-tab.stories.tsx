import type { Meta, StoryObj } from "@storybook/react";

import { TaskCalender } from "./task-calender";

const meta = {
  title: "TaskCalender",
  component: TaskCalender,
  parameters: {},
} satisfies Meta<typeof TaskCalender>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "2023/01",
    calenderData: [],
    moveToBefore: () => {},
    moveToAfter: () => {},
    firstDayOfNumber: 1,
    lastDayOfNumber: 2,
  },
};
