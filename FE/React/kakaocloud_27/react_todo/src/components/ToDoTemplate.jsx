import React from "react";

import "./ToDoTemplate.scss";

//함수형 컴포넌트에서 매개변수(children)는 상위 컴포넌트에서
//하위 컴포넌트를 만들 때 태그에서 넘겨준 속성들 입니다.
const ToDoTemplate = ({ children }) => {
  return (
    <div className="ToDoTemplate">
      <div className="app-title">일정 관리</div>
      <div className="content">{children}</div>
    </div>
  );
};

export default ToDoTemplate;
