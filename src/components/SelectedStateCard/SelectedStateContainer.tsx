import React from "react";
import "./selectedStateCard.css";

function SelectedStateCard(props: {
  selectedSubscription: { uid: string; name: string; subscription: {} };
}) {
  return (
    <div className="selected-state-container">
      <h4>Selected State</h4>
      <div>
        <small>Name: {props.selectedSubscription.name}</small>
      </div>

      <div>
        <small>UID: {props.selectedSubscription.uid}</small>
      </div>
    </div>
  );
}

export default SelectedStateCard;
