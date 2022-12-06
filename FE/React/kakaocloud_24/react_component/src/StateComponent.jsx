import React, { Component } from "react";

class StateComponent extends Component {
  // state = {number:0}; 를 통해 변환 가능
  // 생성자
  constructor(props) {
    // 상위 클래스 생성자 호출
    super(props);
    //state 생성
    this.state = { number: 0 };
  }
  render() {
    return (
      <>
        <p>숫자:{this.state.number}</p>
        <button
          onClick={(e) => {
            this.setState(
              { number: this.state.number + 1 },
              () => {
                console.log("state 값 변경");
                console.log(this.state);
              }
              //   (prevState) => {
              //     return { number: prevState.number + 1 };
              //   }
            );
          }}
        >
          버튼
        </button>
      </>
    );
  }
}

export default StateComponent;
