import React from "react";

const TabBlockHeader = ({ data, handleTabClick, currentlyActiveTabIndex }) => {
  return (
    <div className="tab-block__header-wrapper">
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
