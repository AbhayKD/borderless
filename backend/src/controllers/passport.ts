import { Request, Response } from 'express';
import { logger } from '../utils/logger';
import { ResponseWrapper } from '../utils/responseWrapper';
import { generateFilename } from '../utils/helpers';
import { extractData, getSignedUrl } from '../service/passport';
import { config } from '../config';
import { ExtractPassportRequestBody } from '../types';

/**
 * Get state of the vehicle at time
 * @param { Request } req
 * @param { Response } res
 * @returns { Promise<void> }
 */
export async function getPassportUploadSignedUrl(_req: Request, res: Response) {
    const response: ResponseWrapper = new ResponseWrapper(res);

    try {
        let fileName = _req?.query?.fileName as string;
        const contentType = (_req?.query?.contentType as string) || undefined;
        fileName == '' || !fileName ? (fileName = generateFilename()) : null;
        const url = await getSignedUrl(fileName, contentType);
        if (url) {
            return await response.ok({
                success: true,
                status: 200,
                data: {
                    url,
                    bucketPath: `${config.cloudConfig.storage.bucketName}/${fileName}`,
                },
            });
        } else {
            throw Error("Couldn't generate singed URL");
        }
    } catch (error) {
        const e = error as Error;
        logger.error(`getPassportUploadSignedUrl error: ${e.message}`);
        response.handle(
            {
                success: false,
                data: { status: 'error', message: e.message },
            },
            400,
        );
    }
}

/**
 *
 * @param { Request } req
 * @param { Response } res
 * @returns { Promise<void> }
 */
export async function extractPassportDates(_req: Request, res: Response) {
    const { imagePath } = _req?.body as ExtractPassportRequestBody;
    const response: ResponseWrapper = new ResponseWrapper(res);
    try {
        if (!imagePath) {
            throw new Error('No image path provided');
        }
        const extractedDates = await extractData(imagePath);
        if (!extractedDates) {
            throw new Error('No extracted dates found from image');
        }
        return await response.ok({
            success: true,
            status: 200,
            data: extractedDates,
        });
    } catch (error) {
        const e = error as Error;
        logger.error(`extractPassportDates error: ${e.message}`);
        response.handle(
            {
                success: false,
                data: { status: 'error', message: e.message },
            },
            400,
        );
    }
}
