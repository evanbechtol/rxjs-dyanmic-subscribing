import React, { useCallback, useMemo } from "react";
import { SelectProps } from "./types";

const Select = ({ subscriptions, onSelect }: SelectProps) => {
  const handleSelectionChanged = useCallback(() => {
    const selectElem = document.getElementById(
      "subscriptions-select-input"
    ) as HTMLInputElement;

    const value = selectElem?.value;

    if (value && value.length) {
      onSelect(value);
    }
  }, [onSelect]);

  const mapOptions = useMemo(
    () =>
      subscriptions.map((sub) => (
        <option key={sub.uid} value={sub.uid}>
          {sub.name}
        </option>
      )),
    [subscriptions]
  );

  return (
    <select id="subscriptions-select-input" onChange={handleSelectionChanged}>
      {mapOptions}
    </select>
  );
};

export default Select;
