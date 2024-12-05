import * as dotenv from 'dotenv';

dotenv.config();

import express from 'express';

import { createYoga } from 'graphql-yoga';
import { applyMiddleware } from 'graphql-middleware';
import { createContext } from './context';
import logger, { expressLogger, logLevel } from './utils/logger';
import apiRouter from './api-router';
import schema from './schema';
import { graphqlLogger, graphqlInputsLogger } from './utils/graphql-logger';

const PORT = process.env.PORT || 8080;

const app = express();
logger.level = 'info';
app.use(expressLogger);

app.use('/health', (_req, res) => {
  res.status(200).send({
    name: 'typescript-service-template',
    message: 'Service is running',
  });
});

app.use(expressLogger);
app.use('/api', apiRouter);

const yoga = createYoga({
  schema: applyMiddleware(schema, graphqlLogger, graphqlInputsLogger),
  context: createContext,
});
app.use('/graphql', yoga);

app.listen(PORT, () => {
  logger.info(`🚀 Server ready at http://localhost:${PORT}/`);
  logger.level = logLevel;
});
