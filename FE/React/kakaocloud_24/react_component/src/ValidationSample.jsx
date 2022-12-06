import React, { Component } from "react";
import "./sample.css";

class ValidationSample extends Component {
  // 클래스 안의 멤버 변수 나 함수 안의 지역 변수 와 유사
  // state 변경 즉시 화면 적용
  state = {
    password: "",
    clicked: false,
    validated: false,
  };

  //Ref(다른 DOM 객체를 참조할 수 있는 속성)
  //input = React.createRef();

  handleButtonClick = (e) => {
    this.setState({
      clicked: true,
      validated: this.state.password === "0000",
    });
    // input 이 참조하는 객체에 focus 설정
    // createRef 함수로 만든 경우
    //this.input.current.focus();
    this.input.focus();
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    return (
      <div>
        <input
          type="password"
          //ref={this.input}
          ref={(ref) => (this.input = ref)}
          value={this.state.password}
          className={
            this.state.clicked
              ? this.state.validated
                ? "success"
                : "failure"
              : ""
          }
          name="password"
          onChange={this.handleChange}
        />
        <button onClick={this.handleButtonClick}>검증</button>
      </div>
    );
  }
}

export default ValidationSample;
