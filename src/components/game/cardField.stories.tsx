import { Meta } from "@storybook/react";

import { CardField } from "./cardField";

const meta = {
  component: CardField,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof CardField>;

export default meta;

export const Default = {
  args: {
    cards: [
      {
        kind: "NumberCard",
        color: "red",
        number: 5,
        id: 1,
        canDiscard: true,
      },
      {
        kind: "ReverseCard",
        color: "green",
        id: 2,
        canDiscard: true,
      },
      {
        kind: "SkipCard",
        color: "blue",
        id: 3,
        canDiscard: true,
      },
      {
        kind: "DrawTwoCard",
        color: "yellow",
        id: 4,
        canDiscard: true,
      },
    ],
  },
};
