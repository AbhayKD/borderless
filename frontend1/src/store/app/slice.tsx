import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialAppState } from "../constants";
import { Status } from "../enums";
import { appReducers } from "./reducer";
import {
  getExtractedDates,
  getSignedUrl,
  uploadImageAndExtractDates,
} from "./thunk";
import { AppState } from "./type";

const appSlice = createSlice({
  name: "app",
  initialState: initialAppState,
  reducers: appReducers,
  extraReducers: (builder) => {
    builder
      .addCase(uploadImageAndExtractDates.pending, (state, _) => {
        state.status = Status.LOADING;
      })
      .addCase(getSignedUrl.pending, (state, _) => {
        state.status = Status.LOADING;
      })
      .addCase(getExtractedDates.pending, (state, _) => {
        state.status = Status.LOADING;
      })
      .addCase(uploadImageAndExtractDates.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.error = action.payload || null;
      })
      .addCase(getSignedUrl.rejected, (state, action) => {
        state = {
          ...state,
          status: Status.FAILED,
          error: action.payload || null,
        };
      })
      .addCase(getExtractedDates.rejected, (state, action) => {
        state = {
          ...state,
          status: Status.FAILED,
          error: action.payload || null,
        };
      })
      .addCase(uploadImageAndExtractDates.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.imageInfo = { ...state.imageInfo, bucketPath: action.payload };
      })
      .addCase(getExtractedDates.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.extractResult = action.payload;
      })
      .addCase(
        getSignedUrl.fulfilled,
        (state: AppState, action: PayloadAction<Record<string, string>>) => {
          state.imageInfo = {
            ...state.imageInfo,
            signedUploadUrl: action.payload?.url,
            bucketPath: action.payload?.bucketPath,
          };
          state.error = null;
        }
      );
  },
});

export const { setImageInfo, setExtractDatesResult } = appSlice.actions;
export default appSlice.reducer;
