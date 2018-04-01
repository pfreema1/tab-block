import React from "react";

const TabBlockHeader = ({
  data,
  handleTabClick,
  currentlyActiveTabIndex,
  tabBlockHeaderRef,
  handleTabHeaderScroll,
  showLeftTabBlur,
  showRightTabBlur,
  handleArrowClick
}) => {
  return (
    <div
      onScroll={handleTabHeaderScroll}
      ref={tabBlockHeaderRef}
      className={
        "tab-block__header-wrapper " +
        (showLeftTabBlur ? "header-hover-left " : "") +
        (showRightTabBlur ? "header-hover-right " : "")
      }
    >
      <div
        onClick={handleArrowClick.bind(null, "right")}
        className="right-button"
      >
        &rt
      </div>
      <div
        onClick={handleArrowClick.bind(null, "left")}
        className="left-button"
      >
        &lt
      </div>
      {data.map((tab, index) => {
        return (
          <div
            key={index}
            onClick={handleTabClick.bind(null, index)}
            className={
              "tab-block__header-tab " +
              (currentlyActiveTabIndex === index ? "active-tab" : " ")
            }
          >
            {tab.title}
          </div>
        );
      })}
    </div>
  );
};

export default TabBlockHeader;
