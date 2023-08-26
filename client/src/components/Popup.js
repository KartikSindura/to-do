import React from "react";

export default function Popup(props) {
    
  return (
    <div className="absolute bottom-5 right-5 ease-in-out transition-all duration-200" style={{ opacity: props.vis }}>
      <div className="p-5 rounded-lg shadow-sm bg-red-400 border-2 border-red-200 font-medium w-80 dark:text-text text-white dark:bg-type dark:outline-none dark:outline-type dark:border-0 ">
        {props.err}
      </div>
    </div>
  );
}
Popup.defaultProps = {
  vis: "0",
};
