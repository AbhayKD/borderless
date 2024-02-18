import { GlobalAppState } from "../store";
import { createSelector } from "reselect";
import { AppState } from "./type";

export const selectAppState = (state: GlobalAppState): AppState =>
  state.appState;

export const selectImageInfo = createSelector(
  [selectAppState],
  (appState) => appState.imageInfo
);

export const selectExtractionResult = createSelector(
  [selectAppState],
  (appState) => appState.extractResult
);
