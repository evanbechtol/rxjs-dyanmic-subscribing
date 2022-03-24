import React from "react";
import "./selectedStateCard.css";
import { SelectedSateContainerProps } from "./types";

function SelectedStateCard({
  selectedSubscription,
  selectedState,
}: SelectedSateContainerProps) {
  return (
    <div className="selected-state-container">
      <h4>Selected State</h4>
      <div>
        <small>Name: {selectedSubscription.name}</small>
      </div>

      <div>
        <small>UID: {selectedSubscription.uid}</small>
      </div>

      <div>
        <small>Name: {selectedState?.user?.name}</small>
      </div>

      <div>
        <small>Age: {selectedState?.user?.age}</small>
      </div>

      <div>
        <small>Gender: {selectedState?.user?.gender}</small>
      </div>

      <div>
        <small>ID: {selectedState?.user?.id}</small>
      </div>

      <div>
        <small>App ID: {selectedState?.appId}</small>
      </div>
    </div>
  );
}

export default SelectedStateCard;
