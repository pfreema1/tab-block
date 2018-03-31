import React from "react";

const TabBlockContent = ({
  data,

  currentlyActiveTabIndex
}) => {
  return (
    <div className="tab-block__content-wrapper">
      {data.map((tab, index) => {
        return (
          <div
            key={index}
            className={
              "tab-block__content " +
              (currentlyActiveTabIndex === index ? "active-content" : "")
            }
          >
            <p dangerouslySetInnerHTML={{ __html: tab.text }} />
          </div>
        );
      })}
    </div>
  );
};

export default TabBlockContent;
