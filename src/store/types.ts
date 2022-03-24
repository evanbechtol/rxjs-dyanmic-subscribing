export interface User {
  name: string;
  id: string | number;
  age: number;
  country: string;
  gender: string;
}
export interface State {
  user: User;
  appId: string;
}
