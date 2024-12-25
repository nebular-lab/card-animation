import { fn } from "@storybook/test";

import { Button } from "./button";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      options: ["primary", "secondary", "destructive"],
      control: { type: "radio" },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "destructive",
    children: "ラベル",
    onClick: fn(),
    size: "sm",
  },
};
