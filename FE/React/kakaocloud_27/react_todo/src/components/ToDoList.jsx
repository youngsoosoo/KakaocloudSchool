import React, { useCallback } from "react";
import "./ToDoList.scss";
import ToDoListItem from "./ToDoListItem";

import { List } from "react-virtualized";

const ToDoList = ({ todos, onRemove, onToggle }) => {
  //하나의 항목을 랜더링하기 위한 함수를 생성
  const rowRenderer = useCallback(
    ({ index, key, style }) => {
      //출력할 데이터 가져오기
      const todo = todos[index];
      return (
        <ToDoListItem
          todo={todo}
          key={key}
          onRemove={onRemove}
          onToggle={onToggle}
          style={style}
        />
      );
    },
    [onRemove, onToggle, todos]
  );
  return (
    <List
      className="ToDoList"
      width={512} //항목의 너비
      height={513} //전체 높이
      rowCount={todos.length} //전체 데이터 개수
      rowHeight={57} //항목의 높이
      rowRenderer={rowRenderer} //행을 만들어주는 함수
      list={todos} //데이터
      style={{ outline: "none" }}
    />
  );
};
export default ToDoList;
