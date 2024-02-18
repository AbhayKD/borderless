import { AppState, ImageInfo } from "./type";
import { PayloadAction } from "@reduxjs/toolkit";

export const setImageInfo = (
  state: AppState,
  action: PayloadAction<ImageInfo>
) => {
  state.imageInfo = { ...state.imageInfo, ...action.payload };
};

export const setExtractDatesResult = (
  state: AppState,
  action: PayloadAction<Record<string, any>>
) => {
  return {
    ...state,
    extractResult: action.payload,
  };
};

export const appReducers = {
  setImageInfo,
  setExtractDatesResult,
};
