import type { StorybookConfig } from "@storybook/nextjs";
import path from "path";
const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  webpackFinal: async (config, { configType }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@/config": path.resolve(__dirname, "../src/config"),
      "@/lib": path.resolve(__dirname, "../src/lib"),
      "@/components": path.resolve(__dirname, "../src/components"),
      "@/components/parts": path.resolve(__dirname, "../src/components/parts"),
      "@/model": path.resolve(__dirname, "../src/model"),
    };

    return config;
  },
};
export default config;
