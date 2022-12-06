import React, { useState } from "react";

const EventPracticeFunc = () => {
  //   const [name, setName] = userState("");
  //   const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    // 하나로 묶어서 만들기
    username: "",
    message: "",
  });
  const { username, message } = form;

  const onChange = (e) => {
    // form을 복제해서 e.target.name 에 해당하는 속성만
    // e.target.value 로 수정
    // react는 직접 수정이 아닌 복제 후 수정
    const nextForm = { ...form, [e.target.name]: e.target.value };
    setForm(nextForm);
  };
  const onClick = (e) => {
    alert(username + ":" + message);
    setForm({
      username: "",
      message: "",
    });
  };
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      onClick();
    }
  };
  return (
    <>
      <h1>이벤트 연습 - 함수</h1>
      <input
        type="text"
        name="username"
        value={username}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
      <input
        type="text"
        name="message"
        value={message}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
      <button onClick={onClick}>확인</button>
    </>
  );
};

export default EventPracticeFunc;
