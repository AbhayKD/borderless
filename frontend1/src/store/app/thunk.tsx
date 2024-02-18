import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  API_BASE_URL,
  EXTRACT_DATES_URL,
  GET_UPLOAD_SIGNED_URL,
} from "../constants";
import axios from "axios";
import { GlobalAppState, RootState } from "../store";

export const getSignedUrl = createAsyncThunk<
  Record<string, string>,
  undefined,
  { rejectValue: string; state: RootState }
>("app/getSignedUrl", async (_, { getState, rejectWithValue }) => {
  try {
    const {
      appState: { imageInfo },
    } = getState() as GlobalAppState;
    // get signed url
    const signedUrlResult = await axios.get<Record<string, any>>(
      `${API_BASE_URL}${GET_UPLOAD_SIGNED_URL}?fileName=${imageInfo.fileName}&contentType=${imageInfo.fileType}`
    );
    if (signedUrlResult.status !== 200) {
      throw new Error("Failed to get the signed url for upload");
    }
    const {
      data: { data: uploadData },
    } = signedUrlResult;
    return uploadData;
  } catch (err) {
    console.error(err);
    return rejectWithValue(err as string);
  }
});

export const getExtractedDates = createAsyncThunk<
  Record<string, string>,
  undefined,
  { rejectValue: string; state: RootState }
>("app/getExtractedDates", async (_, { getState, rejectWithValue }) => {
  try {
    const {
      appState: { imageInfo },
    } = getState() as GlobalAppState;
    // get signed url
    const extractedDatesResult = await axios.post<Record<string, any>>(
      `${API_BASE_URL}${EXTRACT_DATES_URL}`,
      { imagePath: imageInfo.bucketPath }
    );
    if (extractedDatesResult.status !== 200) {
      throw new Error("Failed to extract dates from passport");
    }
    const {
      data: { data: extractionResult },
    } = extractedDatesResult;
    return extractionResult;
  } catch (err) {
    console.error(err);
    return rejectWithValue(err as string);
  }
});

export const uploadImageAndExtractDates = createAsyncThunk<
  undefined,
  File,
  { rejectValue: string; state: RootState }
>("app/uploadImage", async (file, { dispatch, getState, rejectWithValue }) => {
  try {
    await dispatch(getSignedUrl());
    const {
      appState: { imageInfo },
    } = getState() as GlobalAppState;
    if (!imageInfo.signedUploadUrl) {
      throw new Error("Invalid signed upload url");
    }
    // upload image to the bucket
    const uploadResult = await axios.put(imageInfo.signedUploadUrl, file, {
      headers: { "Content-Type": imageInfo.fileType },
    });
    if (uploadResult.status !== 200) {
      throw new Error("Failed to upload image");
    }
    await dispatch(getExtractedDates());
  } catch (err) {
    console.error(err);
    return rejectWithValue(err as string);
  }
});
