import React, { Component } from "react";
import "./TabBlockContainer.css";
import TabBlockHeader from "../Components/TabBlockHeader";
import TabBlockContent from "../Components/TabBlockContent";

class TabBlockContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentlyActiveTabIndex: 0
    };
  }

  handleTabClick = (clickedIndex, e) => {
    // for (let i = 0; i < this.props.data.length; i++) {
    //   if (i === clickedIndex) {
    //     this.tabsParent.children[i].classList.add("active-tab");
    //   } else {
    //     this.tabsParent.children[i].classList.remove("active-tab");
    //   }
    // }
  };

  render() {
    const { data } = this.props;
    const { currentlyActiveTabIndex } = this.state;

    return (
      <div className="tab-block-wrapper">
        <TabBlockHeader
          tabsParentElRef={el => (this.tabsParent = el)}
          data={data}
          handleTabClick={this.handleTabClick}
        />
        <TabBlockContent
          data={data}
          contentParentElRef={el => (this.contentEl = el)}
          currentlyActiveTabIndex={currentlyActiveTabIndex}
        />
      </div>
    );
  }
}

export default TabBlockContainer;
