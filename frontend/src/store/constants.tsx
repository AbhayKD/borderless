import { Status } from "./enums";
import { AppState } from "./app/type";

export const defaultImageInfo = {
  fileName: "",
  fileType: "",
  preview: "",
  bucketPath: "",
  signedUploadUrl: "",
};
export const initialAppState: AppState = {
  imageInfo: defaultImageInfo,
  status: Status.IDLE,
  error: null,
  extractResult: {},
};

interface CustomWindow extends Window {
  _env_?: {
    API_BASE_URL: string;
  };
}

declare let window: CustomWindow;

export const API_BASE_URL: string = process.env.API_BASE_URL ? 
  process.env.API_BASE_URL: (
    window._env_? 
    window._env_.API_BASE_URL : "http://localhost:3000"
  );
export const GET_UPLOAD_SIGNED_URL = "/passport/generate-signed-url";
export const EXTRACT_DATES_URL = "/passport/extract-dates";
