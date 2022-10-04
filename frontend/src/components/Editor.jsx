import React, { useContext } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { solutionContext } from "../contexts/ContextApi";

function Editor({ value, height, readOnly }) {
  const { solutionData, setSolutionData } = useContext(solutionContext);
  const onChange = React.useCallback((value, viewUpdate) => {
    setSolutionData((prevState) => {
      return {
        ...prevState,
        code: value,
      };
    });
  }, []);

  return (
    <CodeMirror
      value={value}
      height={height ? height : "90vh"}
      extensions={[javascript({ jsx: true })]}
      onChange={onChange}
      theme="dark"
      readOnly={readOnly ? readOnly : false}
    />
  );
}
export default Editor;
