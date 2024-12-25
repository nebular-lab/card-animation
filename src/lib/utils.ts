import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const domDistance = ({ from, to }: { from: DOMRect; to: DOMRect }) => {
  const fromCenterX = (from.left + from.right) / 2;
  const fromCenterY = (from.top + from.bottom) / 2;
  const toCenterX = (to.left + to.right) / 2;
  const toCenterY = (to.top + to.bottom) / 2;

  const x = toCenterX - fromCenterX;
  const y = toCenterY - fromCenterY;

  return { x, y };
};
