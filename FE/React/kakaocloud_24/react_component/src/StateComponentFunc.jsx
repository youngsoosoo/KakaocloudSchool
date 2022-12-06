import React, { useState } from "react";

const StateComponentFunc = () => {
  const [message, setMessage] = useState("기본값");
  const onClickEnter = (e) => {
    setMessage("진입");
  };
  const onClickLeave = (e) => {
    setMessage("탈출");
  };

  const [color, setColor] = useState("black");
  return (
    <>
      <button onClick={onClickEnter}>입장</button>
      <button onClick={onClickLeave}>퇴장</button>
      <h1>{message}</h1>
      <button style={{ color: "red" }} onClick={() => setColor("red")}>
        빨강
      </button>
      <button style={{ color: "blue" }} onClick={() => setColor("blue")}>
        파랑
      </button>
    </>
  );
};

export default StateComponentFunc;
