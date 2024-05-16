import React, { useState } from "react";
import Client from "../Components/Client";
import Editor from "../Components/Editor";
const EditorPage = () => {
  const [clients, setClients] = useState([
    { socketId: 1, username: "Himanshu" },
    { socketId: 2, username: "Rakesh" },
    {
      socketId: 3,
      username: "Himanshu",
    },
  ]);
  return (
    <>
      <div className="mainWrap">
        <div className="aside">
          <div className="asideInner">
            <div className="logo">
              <img className="logoImage" src="/code-sync.png" alt="Logo" />
            </div>
            <h3>Connected</h3>
            <div className="clientsList">
              {clients.map((client) => {
                return (
                  <Client
                    key={client.socketId}
                    username={client.username}
                  ></Client>
                );
              })}
            </div>
          </div>
          <button className="btn copyBtn"> Copy Room ID</button>
          <button className="btn leaveBtn">Leave</button>
        </div>
          <div className="editorWrap">
            <Editor></Editor>
          </div>
      </div>
    </>
  );
};

export default EditorPage;
