// config
export interface Config {
    serviceName: string;
    port: number;
    loggerLevel: string;
    cloudConfig: CloudConfig;
}

export interface CloudConfig {
    storage: StorageConfig;
    apiKeyPath: string;
}

export interface StorageConfig {
    bucketName: string;
}

export enum BucketActionOptions {
    WRITE = 'write',
    READ = 'read',
    DELETE = 'delete',
    RESUMABLE = 'resumable',
}

export enum BucketVersions {
    V4 = 'v4',
    V2 = 'v2',
}

export interface VisionApiResponse {
    textAnnotations?: VisionTextAnnotation[];
}

export interface VisionTextAnnotation {
    text: string;
}

export interface ExtractPassportRequestBody {
    imagePath: string;
}

export interface ExtractDateResponse {
    dateOfBirth: string | null;
    expiryDate: string | null;
}
