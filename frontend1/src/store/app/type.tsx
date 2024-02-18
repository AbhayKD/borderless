import { AsyncThunk } from "@reduxjs/toolkit";
import { Status } from "../enums";

export type ImageInfo = {
  preview: string;
  fileName?: string;
  fileType?: string;
  bucketPath?: string;
  signedUploadUrl?: string;
};

export interface AppState {
  imageInfo: ImageInfo;
  extractResult: Record<string, any>;
  status: Status;
  error: string | null;
}

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

export type PendingAction = ReturnType<GenericAsyncThunk["pending"]>;
export type RejectedAction = ReturnType<GenericAsyncThunk["rejected"]>;
export type FulfilledAction = ReturnType<GenericAsyncThunk["fulfilled"]>;
