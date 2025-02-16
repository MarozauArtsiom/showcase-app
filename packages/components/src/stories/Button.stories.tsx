import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Button, ButtonProps } from "../components";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    variant: {
      control: {
        type: "select",
        options: ["primary", "secondary", "danger"],
      },
    },
    disabled: {
      control: "boolean",
    },
    label: {
      control: "text",
    },
    onClick: {
      action: "changed",
      table: { disable: true },
    },
  },
} as Meta<typeof Button>;

// Template for rendering your Button
const Template: StoryFn<ButtonProps> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: "Primary Button",
  variant: "primary",
  disabled: false,
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: "Secondary Button",
  variant: "secondary",
  disabled: false,
};

export const Danger = Template.bind({});
Danger.args = {
  label: "Danger Button",
  variant: "danger",
  disabled: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: "Disabled Button",
  variant: "primary",
  disabled: true,
};
