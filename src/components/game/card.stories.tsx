import { Meta } from "@storybook/react";

import { Card } from "./card";

const meta = {
  component: Card,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Card>;

export default meta;

export const NumberCard = {
  args: {
    cardVariant: {
      kind: "NumberCard",
      color: "red",
      number: 5,
    },
    size: "md",
  },
};

export const ForceWildCard = {
  args: {
    cardVariant: {
      kind: "ForceWildCard",
      selectColor: "red",
    },
    size: "md",
  },
};

export const ReverseCard = {
  args: {
    cardVariant: {
      kind: "ReverseCard",
      color: "red",
    },
    size: "md",
  },
};

export const SkipCard = {
  args: {
    cardVariant: {
      kind: "SkipCard",
      color: "red",
    },
    size: "md",
  },
};

export const DrawTwoCard = {
  args: {
    cardVariant: {
      kind: "DrawTwoCard",
      color: "red",
    },
    size: "md",
  },
};

export const WildCard = {
  args: {
    cardVariant: {
      kind: "WildCard",
    },
    size: "md",
  },
};

export const DrawFourCard = {
  args: {
    cardVariant: {
      kind: "WildDrawFourCard",
    },
    size: "md",
  },
};

export const HiddenCard = {
  args: {
    cardVariant: {
      kind: "HiddenCard",
    },
    size: "md",
  },
};
