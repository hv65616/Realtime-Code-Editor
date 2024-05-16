import React, { useState } from 'react'
import { v4 as uuidv4 } from "uuid"
const Home = () => {
  const [roomId, setRoomId] = useState("");
  const [userName,setUserName] = useState("");
  console.log(roomId,userName)
  const createNewRoom = (e) => {
    e.preventDefault()
    const Id = uuidv4()
    setRoomId(Id)
  }
  return (
    <div className="homePageWrapper">
      <div className="formWrapper">
        <img
          className="homePageLogo"
          src="/code-sync.png"
          alt="code-sync-logo"
        />
        <h4 className="mainLabel">Paste invitation ROOM ID</h4>
        <div className="inputGroup">
          <input
            type="text"
            className="inputBox"
            placeholder="ROOM ID"
            value={roomId}
            onChange={(e) => { setRoomId(e.target.value) }}
          />
          <input
            type="text"
            className="inputBox"
            placeholder="USERNAME"
            value={userName}
            onChange={(e) => { setUserName(e.target.value) }}
          />
          <button className="btn joinBtn">
            Join
          </button>
          <span className="createInfo">
            If you don't have an invite then create &nbsp;
            <a onClick={createNewRoom} href="/" className="createNewBtn">
              new room
            </a>
          </span>
        </div>
      </div>
      <footer>
        <h4>
          Built with 💛 &nbsp; by &nbsp;
          <a href="https://github.com/hv65616">Himanshu Verma</a>
        </h4>
      </footer>
    </div>
  );
}

export default Home