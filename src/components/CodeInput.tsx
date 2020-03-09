import React from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import { Task } from "../App";
import { Select, MenuItem } from "@material-ui/core";
require("codemirror/mode/xml/xml");
require("codemirror/mode/javascript/javascript");
require("codemirror/mode/python/python");
require("codemirror/mode/clike/clike");

interface CodeInputProps {
  className?: string;
  code: string;
  changeTask: (key: number, task: Task) => void;
  task: Task;
  selectedTask: number;
}

const CodeInput: React.FC<CodeInputProps> = (props: CodeInputProps) => {
  const { changeTask, task, selectedTask, className } = props;
  const setCode = (code: string): void => {
    task.code = code;
    changeTask(selectedTask, task);
  };

  const [language, setLanguage] = React.useState("javascript");
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>): void => {
    setLanguage(event.target.value as string);
  };

  return (
    <div>
      <Select value={language} onChange={handleChange}>
        <MenuItem value={"javascript"}>JavaScript</MenuItem>
        <MenuItem value={"python"}>Python</MenuItem>
        <MenuItem value={"text/x-java"}>Java</MenuItem>
        <MenuItem value={"Other"}>Other</MenuItem>
      </Select>
      <CodeMirror
        className={className}
        value={task.code}
        options={{
          mode: language,
          theme: "material",
          lineNumbers: true
        }}
        onBeforeChange={(_editor, _data, value): void => {
          setCode(value);
        }}
        onChange={(): void => {
          // console.log("code:", task.code);
        }}
      />
    </div>
  );
};

export default CodeInput;
