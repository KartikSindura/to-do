import React from "react";

export default function Popup(props) {
    
  return (
    <div className="absolute bottom-5 right-5" style={{ display: props.vis }}>
      <div className="p-5 rounded-lg shadow-sm bg-red-400 border-2 border-red-200 font-medium w-80 text-white ease-in-out">
        {props.err}
      </div>
    </div>
  );
}
Popup.defaultProps = {
  vis: "none",
};
