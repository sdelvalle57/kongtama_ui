import { StoreState } from "../../types/store";

export const getHelloMessage = (state: StoreState): string => state.ui.sayHello;
