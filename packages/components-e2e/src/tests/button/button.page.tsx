import { Button } from "@showcase-lab/components";

function ButtonDefault() {
  return <Button onClick={() => alert("clicked")} label="Text in button" />;
}

export default [
  {
    path: "button/default",
    Component: ButtonDefault,
  },
];
