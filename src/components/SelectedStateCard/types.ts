import { State } from "../../store/types";

export interface SelectedSateContainerProps {
  selectedSubscription: { uid: string; name: string; state: {} };
  selectedState: State | undefined;
}
