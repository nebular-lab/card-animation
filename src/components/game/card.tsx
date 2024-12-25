import { cva } from "class-variance-authority";
import { Ban, RefreshCw } from "lucide-react";
import { FC } from "react";
import { match } from "ts-pattern";

import { Card as CardType, HiddenCard } from "@/common/type/card";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  "flex items-center justify-center text-4xl border-2 border-white text-white rounded-lg",
  {
    variants: {
      bgColor: {
        red: "bg-uno-red",
        blue: "bg-uno-blue",
        green: "bg-uno-green",
        yellow: "bg-uno-yellow",
        black: "bg-uno-black",
      },
      size: {
        md: "w-14 h-20",
      },
      hover: {
        true: "",
      },
    },
    compoundVariants: [
      {
        hover: true,
        bgColor: "red",
        className: "hover:bg-uno-red/90",
      },
      {
        hover: true,
        bgColor: "blue",
        className: "hover:bg-uno-blue/90",
      },
      {
        hover: true,
        bgColor: "green",
        className: "hover:bg-uno-green/90",
      },
      {
        hover: true,
        bgColor: "yellow",
        className: "hover:bg-uno-yellow/90",
      },
      {
        hover: true,
        bgColor: "black",
        className: "hover:bg-uno-black/90",
      },
    ],
  },
);

type Props = {
  cardVariant: CardType | HiddenCard;
  size?: "md";
  hover?: boolean;
};

export const Card: FC<Props> = ({ cardVariant, size = "md", hover }) => {
  const bgColor: "blue" | "green" | "red" | "yellow" | "black" = match(
    cardVariant,
  )
    .with({ color: "blue" }, () => "blue" as const)
    .with({ color: "green" }, () => "green" as const)
    .with({ color: "red" }, () => "red" as const)
    .with({ color: "yellow" }, () => "yellow" as const)
    .with({ kind: "ForceWildCard" }, () => "black" as const)
    .with({ kind: "WildCard" }, () => "black" as const)
    .with({ kind: "WildDrawFourCard" }, () => "black" as const)
    .with({ kind: "HiddenCard" }, () => "black" as const)
    .exhaustive();
  return (
    <div className={cn(cardVariants({ bgColor, size, hover }))}>
      <CardContent cardVariant={cardVariant} />
    </div>
  );
};

type CardContentProps = {
  cardVariant: CardType | HiddenCard;
};

const CardContent = (props: CardContentProps) => {
  const { cardVariant } = props;
  return match(cardVariant)
    .with({ kind: "NumberCard" }, (v) => v.number)
    .with({ kind: "ForceWildCard" }, (v) => {
      const color = match(v.selectColor)
        .with("blue", () => "bg-uno-blue")
        .with("green", () => "bg-uno-green")
        .with("red", () => "bg-uno-red")
        .with("yellow", () => "bg-uno-yellow")
        .exhaustive();
      return <div className={cn("h-1/2 w-1/2 rounded-md", color)}></div>;
    })
    .with({ kind: "ReverseCard" }, () => <RefreshCw className="h-3/4 w-3/4" />)
    .with({ kind: "SkipCard" }, () => <Ban className="h-3/4 w-3/4" />)
    .with({ kind: "DrawTwoCard" }, () => "+2")
    .with({ kind: "WildCard" }, () => (
      <div className="grid h-full w-full grid-cols-2 gap-1 px-1 py-2">
        <div className="rounded-tl-sm bg-uno-red" />
        <div className="rounded-tr-sm bg-uno-blue" />
        <div className="rounded-bl-sm bg-uno-green" />
        <div className="rounded-br-sm bg-uno-yellow" />
      </div>
    ))
    .with({ kind: "WildDrawFourCard" }, () => (
      <div className="flex h-full w-full flex-col items-center justify-center p-2">
        <div className="text-xl">+4</div>
        <div className="grid h-full w-full grid-cols-2 gap-0.5">
          <div className="rounded-tl-sm bg-uno-red" />
          <div className="rounded-tr-sm bg-uno-blue" />
          <div className="rounded-bl-sm bg-uno-green" />
          <div className="rounded-br-sm bg-uno-yellow" />
        </div>
      </div>
    ))
    .with({ kind: "HiddenCard" }, () => (
      <div className="h-full w-full bg-uno-black" />
    ))
    .exhaustive();
};
