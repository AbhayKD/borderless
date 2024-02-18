import dotenv from 'dotenv';
import { Config } from './types';

if (process.env.NODE_ENV !== 'production') {
    dotenv.config({ path: '.env' });
}

export const config: Config = {
    serviceName: process.env.SERVICENAME || 'APP',
    port: Number(process.env.PORT) || 3000,
    loggerLevel: 'debug',
    cloudConfig: {
        storage: {
            bucketName: process.env.BUCKET_NAME || '',
        },
        apiKeyPath: process.env.GOOGLE_APPLICATION_CREDENTIALS || '',
    },
};
