import React, { useEffect, useRef, useState } from "react";
import Client from "../Components/Client";
import Editor from "../Components/Editor";
import { initSocket } from "../socket";
import ACTIONS from "../Action";
import { useLocation } from "react-router-dom";
import toast, { LoaderIcon } from "react-hot-toast";
import { useNavigate, Navigate, useParams } from "react-router-dom";
const EditorPage = () => {
  const [clients, setClients] = useState([]);
  const location = useLocation();
  const socketRef = useRef(null);
  const reactNavigator = useNavigate();
  const { roomId } = useParams();
  const params = useParams();
  // console.log(params);
  // console.log(location.state);

  const handleError = (err) => {
    console.log("socket error-", err);
    toast.error("Socket Connection Failed, Try again later");
    reactNavigator("/");
  };
  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (err) => {
        handleError(err);
      });
      socketRef.current.on("connect_error", (err) => {
        handleError(err);
      });
      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state?.userName,
      });
      socketRef.current.on(
        ACTIONS.JOINED,
        ({ clients, username, socketId }) => {
          if (username !== location.state.username) {
            toast.success(`${username} joined the room`);
            console.log(`${username} joined!!!!`);
          }
          setClients(clients)
        }
      );
    };
    init();
  }, []);
  if (!location.state) {
    return <Navigate to="/" />;
  }
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
                    username={client.userName}
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
