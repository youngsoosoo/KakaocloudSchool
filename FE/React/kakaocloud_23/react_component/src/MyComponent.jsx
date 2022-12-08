import React, { Component } from "react";

class MyComponent extends Component {
  render() {
    return (
      <div>
        <MyComponent />
        <MyComponent />
      </div>
    );
  }
}

export default MyComponent;
