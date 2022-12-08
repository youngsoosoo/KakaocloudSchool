import React, { Component } from "react";
import MyComponent from "./MyComponent";

class App extends Component {
  render() {
    let original = {
      num: 1000,
    };
    //객체나 배열은 =로 복사를 하면 참조가 복사
    //동일한 데이터를 가리키게 됩니다.
    let refcopy = original;
    //하나의 객체가 내부 속성을 변경하면
    //다른 객체에게도 영향을 줌
    refcopy.num = 2000;
    // console.log(original);
    // console.log(refcopy);
    //얕은 복사 : 가장 바깥쪽 데이터를 복제
    //Object.assign 함수 이용하는 방법과 {...객체} - spread operater
    //let weakcopy = { ...original };
    let weakcopy = Object.assign({}, original);
    weakcopy.num = 3000;
    // console.log(original);
    // console.log(weakcopy);

    original = {
      num: 1000,
      ar: ["A", "B"],
    };
    //스프레드 연산자는 얕은 복사 - 가장 바깥쪽만 복제
    // weakcopy = { ...original };
    // weakcopy.ar[0] = "이런";
    // console.log(original);
    // console.log(weakcopy);

    //깊은 복사(deep copy) : 재귀적으로 복제하는 것
    //데이터만 깊은 복제
    //JSON 문자열로 변환한 후 JSON 파싱을 수행
    let deepCopy = JSON.parse(JSON.stringify(original));
    console.log(original);
    console.log(deepCopy);
    //함수 마저도 깊은 복제를 하고자 하는 경우
    //함수를 직접 구현하거나 외부 라이브러리의 도움을 받음
    //immer나 lodash 같은 라이브러리가 이러한 역할을 수행
    return (
      <div>
        <MyComponent name={3}>태그 안의 내용</MyComponent>
        <StateComponent/>
        <EventPractice/>
        <ValiditySample/>
        <ScrollBox ref={ref =>{this.box=ref;}}
        <button onClick
      </div>
    );
  }
}

export default App;
