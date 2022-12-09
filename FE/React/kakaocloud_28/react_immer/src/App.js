import React, { useRef, useCallback, useState } from "react";
import produce from "immer";

function App() {
  //컴포넌트 안에서 사용할 변수 생성
  //useRef는 변수 만들 때 사용
  const nextId = useRef(1);
  //state(수정하면 리랜더링을 수행)를 생성하고 setter 함수를 설정
  const [form, setForm] = useState({ name: "", username: "" });
  const [data, setData] = useState({
    array: [],
    uselessValue: null,
  });

  //input에 입력받는 경우 입력하는 데이터가 변경될 때
  //state를 수정해주는 함수
  /*
  const onChange = useCallback(
    (e) => {
      setForm({
        ...form,
        //하나일때
        //state이름: e.target.value;
        //여러 개일 때
        [e.target.name]: [e.target.value],
      });
    },
    [form]
  );
  */
  //위의 함수와의 차이점을 알아두면 좋을듯
  const onChange = useCallback((e) => {
    setForm(
      //draft가 form의 복제본이 되고
      //draft를 수정하면 immer가 알아서
      //form에 데이터를 전송합니다.
      produce((draft) => {
        draft[e.target.name] = e.target.value;
      })
    );
  }, []);

  //입력받은 데이터를 등록하는 함수
  //form에서 submit 이벤트가 발생할 때 호출
  //컴포넌트 안에서 함수를 만들 때는 특별한 경우가 아니면
  //useCallback 안에 만드는 것이 좋습니다.
  //useCallback을 이용하면 두 번째 매개변수로 대입된
  //deps 배열 안의 데이터가 변경되는 경우만 새로 만들어집니다.
  //useCallback을 사용하지 않으면 리랜더링 될 때 마다
  //함수가 다시 만들어집니다.
  /*const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      //기본적으로 제공되는 이벤트를 수행하지 않도록 함.
      //a 태그를 이용한 이동이나 form의 submit이나 reset 이벤트는
      //화면 전체를 새로 생성합니다.
      //이전에 가지고 있던 내용을 모두 삭제합니다.
      // react, vue, angular는 SPA Framework 라서
      //화면 전체를 다시 랜더링하면 기본틀이 무너집니다.
      //화면에 출력된 내용과 가상의 DOM을 비교해서 변경된 부분문
      //리랜더링을 수행합니다.

      const info = {
        id: nextId.current,
        name: form.name,
        username: form.username,
      };

      setData({
        ...data,
        array: data.array.concat(info),
      });

      setForm({
        name: "",
        username: "",
      });

      nextId.current += 1;
    },
    [data, form.name, form.username]
  );*/

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const info = {
        id: nextId.current,
        name: form.name,
        username: form.username,
      };

      //data를 draft에 깊은 복사를 하고
      //draft에 작업을 수행한 후에 다시 data에 복제
      setData(
        produce((draft) => {
          draft.array.push(info);
        })
      );

      setForm({
        name: "",
        username: "",
      });

      nextId.current += 1;
    },
    [form.name, form.username]
  );

  //항목을 삭제하는 함수
  /*const onRemove = useCallback(
    (e) => {
      setData({
        ...data,
        array: data.array.filter((info) => info.id !== e),
      });
    },
    [data]
  );*/

  const onRemove = useCallback((id) => {
    setData(
      produce((draft) => {
        draft.array.splice(
          draft.array.findIndex((info) => info.id === id),
          1
        );
      })
    );
  }, []);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="username"
          placeholder="아이디를 입력하세요"
          value={form.username}
          onChange={onChange}
        />
        <input
          name="name"
          placeholder="이름를 입력하세요"
          value={form.name}
          onChange={onChange}
        />
        <button type="submit">등록</button>
      </form>

      <div>
        <ul>
          {data.array.map((info) => (
            <li key={info.id} onClick={() => onRemove(info.id)}>
              {info.username} ({info.name})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
