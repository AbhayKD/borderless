import { config } from './config';
import express from 'express';
import cluster from 'cluster';
import { logger } from './utils/logger';
import { cpus } from 'os';
import cors from 'cors';

import routes from './routes';

const numCPUs = cpus().length;
const allowedOrigins = ['https://borderless-frontend-app-8c6f4c2dc529.herokuapp.com', 'http://localhost:8080']

export default function main() {
    if (cluster.isPrimary) {
        // create a worker for each CPU
        for (let i = 0; i < numCPUs; i++) {
            cluster.fork();
        }
        cluster.on('online', (worker) => {
            logger.info(`worker online, worker id: ${worker.id}`);
        });
        //if worker dies, create another one
        cluster.on('exit', (worker, code, signal) => {
            logger.error(`worker died, worker id: ${worker.id} | signal: ${signal} | code: ${code}`);
            cluster.fork();
        });
    } else {
        //create express app
        const app: express.Express = express();
        const router: express.Router = express.Router();

        const corsOptions = {
            origin: 'http://localhost:8080', // Allow only this origin, adjust as needed
            optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
        };

        app.use(cors(corsOptions));
        app.use(cors({
            origin: (origin, callback) => {
              // allow requests with no origin (like mobile apps or curl requests)
              if (!origin) return callback(null, true);
              
              if (allowedOrigins.indexOf(origin) === -1) {
                var msg = 'The CORS policy for this site does not ' +
                          'allow access from the specified Origin.';
                return callback(new Error(msg), false);
              }
              return callback(null, true);
            }
        }));

        app.use(express.json());
        app.use(router); // tell the app this is the router we are using

        app.use('/', routes);

        app.listen(config.port, async function () {
            const workerId = cluster.worker && cluster.worker.id ? cluster.worker.id : undefined;
            logger.info(`worker started: ${workerId} | server listening on port: ${config.port}`);
        });
    }
}
main();
