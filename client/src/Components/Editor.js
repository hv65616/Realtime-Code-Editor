import React, { useEffect, useRef, useState } from "react";
import Codemirror from "codemirror";
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/dracula.css";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import "codemirror/lib/codemirror.css";
import ACTIONS from "../Action";
const Editor = ({ socketRef, roomId }) => {
  const editorRef = useRef(null);
  useEffect(() => {
    async function init() {
      // console.log("Hello");
      editorRef.current = Codemirror.fromTextArea(
        document.getElementById("realtimeEditor"),
        {
          mode: { name: "javascript", json: true },
          theme: "dracula",
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineNumbers: true,
        }
      );
      editorRef.current.on("change", (instance, changes) => {
        // console.log(changes);
        const { origin } = changes;
        const code = instance.getValue();
        if (origin !== "setValue") {
          // console.log(code);
          socketRef.current.emit(ACTIONS.CODE_CHANGE, {
            roomId,
            code,
          });
        }
        // console.log(code);
      });
    }
    init();
  }, []);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
        // console.log(code);
        if (code !== null) {
          editorRef.current.setValue(code);
        }
      });
    }
  }, [socketRef.current]);
  return <textarea name="" id="realtimeEditor"></textarea>;
};

export default Editor;
