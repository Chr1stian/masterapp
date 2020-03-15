import React from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import { Task } from "../App";
import DirectionCard from "./DirectionCard";
import {
  Card,
  Select,
  MenuItem,
  makeStyles,
  createStyles
} from "@material-ui/core";
require("codemirror/mode/xml/xml");
require("codemirror/mode/javascript/javascript");
require("codemirror/mode/python/python");
require("codemirror/mode/clike/clike");

interface CodeInputProps {
  code: string;
  changeTask: (task: Task) => void;
  task: Task;
}

const useStyles = makeStyles(() =>
  createStyles({
    card: {
      marginTop: "5px"
    },
    select: {
      margin: "5px",
      minWidth: "30%"
    }
  })
);

const CodeInput: React.FC<CodeInputProps> = (props: CodeInputProps) => {
  const classes = useStyles();
  const { changeTask, task } = props;
  const setCode = (code: string): void => {
    task.code = code;
    const newSplitCode: React.ReactNodeArray[] = [];
    const split = task.code.split("\n");
    split.forEach(element => {
      newSplitCode.push([element]);
    });
    task.splitCode = newSplitCode;
    changeTask(task);
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>): void => {
    task.language = event.target.value as string;
    changeTask(task);
  };

  return (
    <div>
      <DirectionCard text={"Paste or write your code here"}></DirectionCard>
      <Card className={classes.card}>
        <Select
          className={classes.select}
          value={task.language}
          onChange={handleChange}
        >
          <MenuItem value={"javascript"}>JavaScript</MenuItem>
          <MenuItem value={"python"}>Python</MenuItem>
          <MenuItem value={"text/x-java"}>Java</MenuItem>
          <MenuItem value={"Other"}>Other</MenuItem>
        </Select>
        <CodeMirror
          value={task.code}
          options={{
            mode: task.language,
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
      </Card>
    </div>
  );
};

export default CodeInput;
