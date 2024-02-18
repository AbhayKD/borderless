import { Storage } from '@google-cloud/storage';
import { ImageAnnotatorClient } from '@google-cloud/vision';
import { config } from '../config';
import { logger } from '../utils/logger';
import { BucketActionOptions, BucketVersions, ExtractDateResponse, VisionTextAnnotation } from '../types';
import { DOB_LABELS, EXPIRY_DATE_LABELS, indexOfFirstSubstring } from '../utils/helpers';
// import {} from "./helpers"

const storage = new Storage();

/**
 * Single query to client
 * @param sqlText
 * @param params
 * @returns { Promise<QueryResult<any>> }
 */
export const getSignedUrl = async (fileName: string, contentType?: string): Promise<string> => {
    try {
        const bucketName = config.cloudConfig.storage.bucketName;
        const bucket = storage.bucket(bucketName);
        const options = {
            version: BucketVersions.V4,
            action: BucketActionOptions.WRITE,
            expires: Date.now() + 5 * 60 * 1000, // 5 minutes
            contentType: contentType || 'application/octet-stream',
        };
        const [url] = await bucket.file(fileName).getSignedUrl(options);
        return url;
    } catch (e) {
        logger.info('Error generating signed url', e);
        throw e;
    }
};

export const extractData = async (imagePath: string): Promise<ExtractDateResponse> => {
    try {
        const client = new ImageAnnotatorClient();
        const [result] = await client.textDetection(imagePath);
        const detections = result.fullTextAnnotation as VisionTextAnnotation | null;
        let dateOfBirth = null;
        let expiryDate = null;
        if (detections) {
            const fullText = detections?.text;
            const splitFullText = fullText.split('\n');
            const dobLabelIndex = indexOfFirstSubstring(splitFullText, DOB_LABELS);
            if (dobLabelIndex > -1 && dobLabelIndex + 1 < splitFullText.length - 1) {
                dateOfBirth = splitFullText[dobLabelIndex + 1];
            }
            const expiryDateLabelIndex = indexOfFirstSubstring(splitFullText, EXPIRY_DATE_LABELS);
            if (expiryDateLabelIndex > -1 && expiryDateLabelIndex + 1 < splitFullText.length - 1) {
                expiryDate = splitFullText[expiryDateLabelIndex + 1];
            }
        }
        return { dateOfBirth, expiryDate };
    } catch (error) {
        logger.info('Error extracting data from image', error);
        throw error;
    }
};
