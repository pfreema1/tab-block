import React, { Component } from "react";
import "./TabBlockContainer.css";
import TabBlockHeader from "../Components/TabBlockHeader";
import TabBlockContent from "../Components/TabBlockContent";

class TabBlockContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentlyActiveTabIndex: 0,
      data: this.prepareContent(props.data),
      headerScrollPos: null,
      tabsScrollable: null,
      showLeftTabBlur: false,
      showRightTabBlur: false
    };
  }

  componentDidMount = () => {
    this.initTabFade();
  };

  initTabFade = () => {
    if (
      this.tabBlockHeaderEl.clientWidth !== this.tabBlockHeaderEl.scrollWidth
    ) {
      console.log("OVERFLOWY");
      this.setState({ showRightTabBlur: true, tabsScrollable: true });
    } else {
      this.setState({ tabsScrollable: false });
    }
  };

  handleTabHeaderScroll = () => {
    let endOfScrollBarPos =
      this.tabBlockHeaderEl.clientWidth + this.tabBlockHeaderEl.scrollLeft;

    if (this.state.tabsScrollable) {
      if (
        this.tabBlockHeaderEl.scrollLeft > 40 &&
        endOfScrollBarPos < this.tabBlockHeaderEl.scrollWidth - 40
      ) {
        //case: scroll bar is between beginning and end
        if (!this.state.showLeftTabBlur || !this.state.showRightTabBlur) {
          this.setState({ showLeftTabBlur: true, showRightTabBlur: true });
        }
      } else if (
        this.tabBlockHeaderEl.scrollLeft <= 40 &&
        this.state.showLeftTabBlur
      ) {
        this.setState({ showLeftTabBlur: false });
      } else if (
        endOfScrollBarPos >= this.tabBlockHeaderEl.scrollWidth - 40 &&
        this.state.showRightTabBlur
      ) {
        this.setState({ showRightTabBlur: false });
      }
    }
  };

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
    const {
      currentlyActiveTabIndex,
      data,
      showRightTabBlur,
      showLeftTabBlur,
      scrolledToEnd
    } = this.state;

    return (
      <div className="tab-block-wrapper">
        <div
          className={showRightTabBlur ? "tab-block__header-overlay--left" : ""}
        />
        <div
          className={showLeftTabBlur ? "tab-block__header-overlay--right" : ""}
        />
        <TabBlockHeader
          data={data}
          handleTabClick={this.handleTabClick}
          currentlyActiveTabIndex={currentlyActiveTabIndex}
          tabBlockHeaderRef={el => (this.tabBlockHeaderEl = el)}
          handleTabHeaderScroll={this.handleTabHeaderScroll}
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
