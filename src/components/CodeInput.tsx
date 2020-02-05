import React from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import { Task } from "../App";
require("codemirror/mode/xml/xml");
require("codemirror/mode/javascript/javascript");

interface CodeInputProps {
  className?: string;
  code: string;
  changeTask: (name: string, task: Task) => void;
  task: Task;
}

const CodeInput: React.FC<CodeInputProps> = (props: CodeInputProps) => {
  const { changeTask, task, className } = props;
  const setCode = (code: string): void => {
    task.code = code;
    changeTask("Task1", task);
  };

  return (
    <CodeMirror
      className={className}
      value={task.code}
      options={{
        mode: "xml",
        theme: "material",
        lineNumbers: true
      }}
      onBeforeChange={(_editor, _data, value): void => {
        setCode(value);
      }}
      onChange={(): void => {
        console.log("code:", task.code);
      }}
    />
  );
};

export default CodeInput;
