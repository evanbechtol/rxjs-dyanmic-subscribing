import { BehaviorSubject } from "rxjs";
import { State } from "./types";

const state = new BehaviorSubject({
  user: {
    age: 0,
    country: "",
    gender: "",
    id: "",
    name: "",
  },
  appId: "",
} as State);

export { state };
