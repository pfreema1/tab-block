import React, { Component } from "react";
import "./TabBlockContainer.css";
import TabBlockHeader from "../Components/TabBlockHeader";
import TabBlockContent from "../Components/TabBlockContent";

class TabBlockContainer extends Component {
  constructor(props) {
    super(props);

    // this.data = this.prepareContent(props.data);

    this.state = {
      currentlyActiveTabIndex: 0,
      data: this.prepareContent(props.data)
    };
  }

  prepareContent = data => {
    let newDataArr = data.map(dataObj => {
      let tempDataObj = { ...dataObj };
      tempDataObj.imageArr.forEach(image => {
        // create new obj property with replaced '*image*' to <img src=....../>

        tempDataObj.htmlString = tempDataObj.text.replace(
          "*image*",
          "<img src='" + image + "' alt='meowmeow'/>"
        );

        // set the text to the htmlString so on the next iteration, we can find the next occurence of *image*
        tempDataObj.text = tempDataObj.htmlString;
      });

      return tempDataObj;
    });

    return newDataArr;
  };

  handleTabClick = (clickedIndex, e) => {
    this.setState({ currentlyActiveTabIndex: clickedIndex });
  };

  render() {
    // const { data } = this.props;
    const { currentlyActiveTabIndex, data } = this.state;

    return (
      <div className="tab-block-wrapper">
        <TabBlockHeader
          data={data}
          handleTabClick={this.handleTabClick}
          currentlyActiveTabIndex={currentlyActiveTabIndex}
        />
        <TabBlockContent
          data={data}
          currentlyActiveTabIndex={currentlyActiveTabIndex}
        />
      </div>
    );
  }
}

export default TabBlockContainer;
