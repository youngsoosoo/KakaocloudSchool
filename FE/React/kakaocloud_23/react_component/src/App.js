import React, { Component } from "react";
import MyComponent from "./MyComponent";

class App extends Component {
  render() {
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
