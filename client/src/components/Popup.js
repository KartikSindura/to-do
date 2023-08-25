import React from "react";

export default function Popup(props) {
  return (
    <div className="popup" style={{ display: props.vis }}>
      {props.err}
    </div>
  );
}
Popup.defaultProps = {
  vis: "none",
};
