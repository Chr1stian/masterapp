import React from "react";
import { Task } from "../App";
import { makeStyles, createStyles } from "@material-ui/core";
import reactStringReplace from "react-string-replace";

const useStyles = makeStyles(() =>
  createStyles({
    div: {
      whiteSpace: "pre-wrap"
    },
    span: {
      color: "red"
    }
  })
);

interface CodeOutputProps {
  task: Task;
}

const CodeOutput: React.FC<CodeOutputProps> = (props: CodeOutputProps) => {
  const classes = useStyles();
  const { task } = props;
  const [selectedText, setSelectedText] = React.useState<undefined | string>(
    ""
  );
  const [replacedCode, setReplacedCode] = React.useState();

  const handleMouseUp = (): void => {
    const selection = window.getSelection()
      ? window.getSelection()?.toString()
      : "";
    console.log(window.getSelection()?.toString());
    if (window.getSelection()) {
      setSelectedText(selection);
    }
    // TODO: Handle when nothing is selected
  };

  // Create button to change
  const handleOnClick = (): void => {
    console.log(selectedText);

    const replacedString = reactStringReplace(
      task.code,
      selectedText,
      (match: React.ReactNode, i: any) => (
        <span className={classes.span}>{match}</span>
      )
    );
    console.log(replacedString);
    setReplacedCode(replacedString);
  };
  // Figure out way to save code with gap and corresponding solution

  return (
    <div>
      <div className={classes.div} onMouseUp={handleMouseUp}>
        {task.code}
      </div>
      <button onClick={handleOnClick}>Split code</button>
      <div>{replacedCode}</div>
    </div>
  );
};

export default CodeOutput;
