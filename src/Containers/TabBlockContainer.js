import React, { Component } from "react";
import "./TabBlockContainer.css";
import TabBlockHeader from "../Components/TabBlockHeader";
import TabBlockContent from "../Components/TabBlockContent";

class TabBlockContainer extends Component {
  constructor(props) {
    super(props);

    this.totalScrollAmount = 175;
    this.currentScrollAmount = 0;

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

  handleArrowClick = (dir, e) => {
    this.scrollStartPos = this.tabBlockHeaderEl.scrollLeft;
    this.scrollEndPos =
      dir === "left"
        ? this.scrollStartPos - this.totalScrollAmount
        : this.scrollStartPos + this.totalScrollAmount;

    if (dir === "left") {
      this.animId = requestAnimationFrame(this.leftAnimFunc);
    } else {
      this.animId = requestAnimationFrame(this.rightAnimFunc);
    }
  };

  // need to write checks for hitting end of scrolls!

  leftAnimFunc = () => {
    console.log("runnin it");
    console.log(
      "this.tabBlockHeaderEl.scrollLeft:  ",
      this.tabBlockHeaderEl.scrollLeft
    );
    if (this.tabBlockHeaderEl.scrollLeft >= this.scrollEndPos) {
      this.tabBlockHeaderEl.scrollLeft -= 15;
      this.animId = requestAnimationFrame(this.leftAnimFunc);
    } else {
      cancelAnimationFrame(this.animId);
    }
  };

  rightAnimFunc = () => {
    console.log("runnin it");
    console.log(
      "this.tabBlockHeaderEl.scrollLeft:  ",
      this.tabBlockHeaderEl.scrollLeft
    );
    if (this.tabBlockHeaderEl.scrollLeft <= this.scrollEndPos) {
      this.tabBlockHeaderEl.scrollLeft += 15;
      this.animId = requestAnimationFrame(this.rightAnimFunc);
    } else {
      cancelAnimationFrame(this.animId);
    }
  };

  scrollToEnd = (scrollDuration, scrollDirection) => {};

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
          className={"overlay-left " + (showRightTabBlur ? "fade-in" : "")}
        />
        <div
          className={"overlay-right " + (showLeftTabBlur ? "fade-in" : "")}
        />

        <TabBlockHeader
          data={data}
          handleTabClick={this.handleTabClick}
          currentlyActiveTabIndex={currentlyActiveTabIndex}
          tabBlockHeaderRef={el => (this.tabBlockHeaderEl = el)}
          handleTabHeaderScroll={this.handleTabHeaderScroll}
          showLeftTabBlur={showLeftTabBlur}
          showRightTabBlur={showRightTabBlur}
          handleArrowClick={this.handleArrowClick}
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
