import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { AppState } from "./app/type";
import appReducer from "./app/slice";

export interface GlobalAppState {
  appState: AppState;
}

export const store = configureStore({
  reducer: {
    appState: appReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
