import React from "react";
import PropTypes from "prop-types";

/*
const MyComponent = ({ name, children, year }) => {
  return (
    <>
      <div>나의 컴포넌트</div>
      <div>
        <h1>컴포넌트 이름은 {name} 입니다</h1>
        <h3>{children}</h3>
        <h3>나는 {year}년 에 태어났다</h3>
      </div>
    </>
  );
};

MyComponent.propTypes = {
  name: PropTypes.string,
  year: PropTypes.number.isRequired,
};
MyComponent.defaultProps = {
  name: "미기입 시 기본값",
};
export default MyComponent;
*/

// 클래스형 컴포넌트
import { Component } from "react";

class MyComponent extends Component {
  render() {
    // props 가져오기
    // props 속성이 존재하기 때문에 분해할당
    const { name, year, children } = this.props;
    return (
      <>
        <div>
          <h2>이름은 {name}</h2>
          <h2>태어난 해는 {year}</h2>
          <h2>children 값은 {children}</h2>
        </div>
      </>
    );
  }
}

MyComponent.defaultProps = {
  name: "기본이름",
};
MyComponent.propTypes = {
  name: PropTypes.string,
  year: PropTypes.number.isRequired,
};

export default MyComponent;
