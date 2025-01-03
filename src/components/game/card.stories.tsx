import { Meta, StoryObj } from "@storybook/react";

import { cardRelation } from "@/common/const";

import { Card } from "./card";

const meta = {
  component: Card,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Card>;

type Story = StoryObj<typeof Card>;

export default meta;

export const NumberCard: Story = {
  args: {
    cardVariant: cardRelation[1],
    size: "md",
  },
};

export const ForceWildCard: Story = {
  args: {
    cardVariant: cardRelation[77],
    size: "md",
  },
};

export const ReverseCard: Story = {
  args: {
    cardVariant: cardRelation[81],
    size: "md",
  },
};

export const SkipCard: Story = {
  args: {
    cardVariant: cardRelation[85],
    size: "md",
  },
};

export const DrawTwoCard: Story = {
  args: {
    cardVariant: cardRelation[83],
    size: "md",
  },
};

export const WildCard: Story = {
  args: {
    cardVariant: cardRelation[105],
    size: "md",
  },
};

export const DrawFourCard: Story = {
  args: {
    cardVariant: cardRelation[109],
    size: "md",
  },
};

export const HiddenCard: Story = {
  args: {
    cardVariant: {
      kind: "HiddenCard",
    },
    size: "md",
  },
};
