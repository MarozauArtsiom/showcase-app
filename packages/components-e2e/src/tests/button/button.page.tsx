import { Button } from "@showcase-lab/components";

function ButtonDefault() {
  return <Button onClick={() => alert("clicked")}>Text in button</Button>;
}

export default [
  {
    path: "button/default",
    Component: ButtonDefault,
  },
];
