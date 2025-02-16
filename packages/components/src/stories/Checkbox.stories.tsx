import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Checkbox, CheckboxProps } from "../components";

export default {
  title: "Components/Checkbox",
  component: Checkbox,
  argTypes: {
    checked: {
      control: "boolean",
    },
    onChange: {
      action: "changed",
      table: { disable: true },
    },
  },
} as Meta<typeof Checkbox>;

const Template: StoryFn<CheckboxProps> = (args) => <Checkbox {...args} />;

export const Checked = Template.bind({});
Checked.args = {
  checked: true,
};

export const Unchecked = Template.bind({});
Unchecked.args = {
  checked: false,
};
