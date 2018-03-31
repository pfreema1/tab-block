import React, { Component } from "react";
import { exampleData as data } from "./Data";
import TabBlockContainer from "./Containers/TabBlockContainer";

class App extends Component {
  render() {
    return (
      <div>
        <TabBlockContainer data={data.tabData} />
      </div>
    );
  }
}

export default App;
