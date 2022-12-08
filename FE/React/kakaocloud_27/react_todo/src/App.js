import ToDoInsert from "./components/ToDoInsert";
import ToDoTemplate from "./components/ToDoTemplate";
import ToDoList from "./components/ToDoList";
//useRef는 변수를 생성하거나 변수를 만들어서 DOM에 할당하기 위해서
//useCallback은 함수를 효율적으로 생성하기 위해서
import React, { useRef, useCallback, useReducer } from "react";

//대량의 데이터를 생성해서 리턴하는 함수
const createBulktodos = () => {
  const array = [];
  for (let i = 1; i <= 2000; i++) {
    array.push({
      id: 1,
      text: `할 일 ${i}`,
      checked: false,
    });
  }
  return array;
};

//state를 조작할 reducer 함수 생성
const todoReducer = (todos, action) => {
  //분기
  switch (action.type) {
    case "INSERT":
      return todos.concat(action.todo);
    case "REMOVE":
      return todos.filter((todo) => todo.id !== action.id);
    case "TOOGLE":
      return todos.map((todo) =>
        todo.id === action.id ? { ...todo, checked: !todo.checked } : todo
      );
    default:
      return todos;
  }
};
function App() {
  //useState에 데이터를 생성하는 함수를 대입할 때
  //함수 호출 구문을 대입하면 데이터가 만들어질 때 마다
  //리랜더링을 합니다.
  //함수 이름을 대입해야 함수를 전부 수행하고 1번만 리랜더링을 수행합니다.
  // const [todos, setToDos] = useState(createBulktodos);

  //리듀서 설정 - 첫 번째 매개변수는 호출될 함수
  //두 번째 매개변수는 초기값
  //세 번재 매개변수는 호출할 메서드로 리턴하는 값이 초기값으로 설정됨

  //리턴될 결과는 state이름과 state를 수정할 함수
  const [todos, dispatch] = useReducer(todoReducer, undefined, createBulktodos);

  //아이디를 위한 변수 생성
  const nextId = useRef(2001);

  //삽입을 처리하기 위한 함수
  //todos에 변화가 생기면 함수를 만들지만 그렇지 않으면
  //기존 함수를 이용
  const onInsert = useCallback((text) => {
    const todo = {
      id: nextId.current,
      text,
      checked: false,
    };
    //함수형 업데이트
    // setToDos((todos) => todos.concat(todo));
    dispatch({ type: "INSERT", todo });
    nextId.current += 1;
  }, []);

  //데이터 삭제를 위한 함수
  const onRemove = useCallback((id) => {
    // setToDos(todos.filter((todo) => todo.id !== id));
    dispatch({ type: "REMOVE", id });
  }, []);

  //데이터 수정을 위한 함수
  const onToggle = useCallback((id) => {
    //todos를 복제해서 하나씩 순회하면서
    //todo의 id 값과 매개변수로 받은 id가 일치하면서
    //checked를 반전하고 그렇지 ㅇ낳으면 그대로
    // setToDos(
    //   todos.map((todo) =>
    //     todo.id === id ? { ...todo, checked: !todo.checked } : todo
    //   )
    //  )
    dispatch({ type: "TOGGLE", id });
  }, []);

  return (
    <ToDoTemplate>
      <ToDoInsert onInsert={onInsert} />
      <ToDoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </ToDoTemplate>
  );
}

export default App;
