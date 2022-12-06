import React from "react";

function CreateUser({ username, email, onChange, onCreate }) {
  return (
    <div>
      <input
        name="username"
        value={username}
        onChange={onChange}
        placeholder="이름 입력"
      />
      <input
        name="email"
        value={email}
        onChange={onChange}
        placeholder="이메일 입력"
      />
      <button onClick={onCreate}>추가</button>
    </div>
  );
}

export default CreateUser;
