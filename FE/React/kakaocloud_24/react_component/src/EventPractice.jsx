import React, { Component } from "react";

class EventPractice extends Component {
  state = {
    name: "",
    message: "",
  };

  // babel이 인스턴스 메서드 변환 작업을 자동 수행
  // this.handleChange 로 메서드 사용 가능
  handleChange = (e) => {
    // 이벤트 발생한 객체는 e.target
    this.setState({
      // input 의 name 과 state 의 name 맞춰주면
      // 값이 변경될 때 state 관리가 쉬워짐
      [e.target.name]: e.target.value,
    });
  };
  handleClick = (e) => {
    alert([this.state.name + ":" + this.state.message]);
    this.setState({ name: "", message: "" });
  };
  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      this.handleClick();
    }
  };
  // 인스턴스의 메서드로 자동 변환
  // constructor(props) {
  //   super(props);
  //   this.handleChange = this.handleChange.bind(this);
  //   this.handleClick = this.handleClick.bind(this);
  // }
  render() {
    return (
      <>
        <h1>이벤트 연습</h1>
        <input
          type="text"
          name="name"
          placeholder="이름 입력"
          value={this.state.name}
          onChange={
            this.handleChange
            // 함수화 (e) => {
            // this.setState({ name: e.target.value });
            // 콘솔 출력 console.log(e.target.value);
          }
        />
        <input
          type="text"
          name="message"
          placeholder="메시지 입력 입력"
          value={this.state.message}
          onChange={
            this.handleChange
            // 함수화 (e) => {
            // this.setState({ name: e.target.value });
            // 콘솔 출력 console.log(e.target.value);
          }
          onKeyPress={this.handleKeyPress}
        />
        <button
          onClick={
            this.handleClick
            //(e) => {
            //alert(this.state.name);
            //this.setState({
            //  name: "",
            //});
          }
          onKeyPress={this.handleKeyPress}
        >
          확인
        </button>
      </>
    );
  }
}

export default EventPractice;
