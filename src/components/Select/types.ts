import { Subscription } from "../../types";

export interface SelectProps {
  subscriptions: Subscription[];
  onSelect: (val: string) => void;
}
