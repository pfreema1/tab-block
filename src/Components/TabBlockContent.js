import React from "react";

const TabBlockContent = ({
  data,
  contentParentElRef,
  currentlyActiveTabIndex
}) => {
  return (
    <div ref={el => contentParentElRef} className="tab-block__content-wrapper">
      {data.map((tab, index) => {
        return (
          <div
            key={index}
            className={
              "tab-block__content " +
              (currentlyActiveTabIndex === index ? "active-tab" : "")
            }
          >
            <p>{tab.text}</p>
          </div>
        );
      })}
    </div>
  );
};

export default TabBlockContent;
