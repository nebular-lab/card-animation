import "@/app/globals.css";
import { initialize, mswLoader } from "msw-storybook-addon";

import type { Preview } from "@storybook/react";

initialize();

const preview: Preview = {
  parameters: {
    layout: "centered",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  tags: ["autodocs"],

  loaders: [mswLoader],
};

export default preview;
