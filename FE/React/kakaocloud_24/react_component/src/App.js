import React, { Component } from "react";

import MyComponent from "./MyComponent";
import StateComponent from "./StateComponent";
import StateComponentFunc from "./StateComponentFunc";
import EventPractice from "./EventPractice";
import EventPracticeFunc from "./EventPracticeFunc";
import ValidationSample from "./ValidationSample";
import ScrollBox from "./ScrollBox";

class App extends Component {
  render() {
    return (
      <div>
        <MyComponent name={3}>태그 안에 내용</MyComponent>;
        <StateComponent />;
        <StateComponentFunc />
        <EventPractice />
        <EventPracticeFunc />
        <ValidationSample />
        <ScrollBox ref={(ref) => (this.scrollBox = ref)} />
        <button
          onClick={() => {
            this.scrollBox.scrollToBottom();
          }}
        >
          맨 아래로
        </button>
      </div>
    );
  }
}

export default App;
