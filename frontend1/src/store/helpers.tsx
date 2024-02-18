export const getFileExtension = (fileName: string) => {
  return fileName.slice(((fileName.lastIndexOf(".") - 1) >>> 0) + 2);
};

export const getImageBucketPath = (signedUrl: string) => {
  const match = signedUrl.match(/https?:\/\/[^\/]+(\/[^?]+)?/);
  return match ? match[1] : "";
};
