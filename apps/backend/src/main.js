import path from 'node:path';
import { readFileSync } from 'node:fs';
import { createServer } from 'node:http';

import { createYoga, createSchema } from 'graphql-yoga';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers } from '@graphql-tools/merge';

import { connectToDatabase } from './db/connection-manager';

import CategoryRestDataSource from './datasources/category-data-source';
import ProductRestDataSource from './datasources/product-data-source';

const typeDefs = readFileSync(path.join(__dirname, './schema.graphql'), 'utf8');

const resolversArray = loadFilesSync(path.join(__dirname, './resolvers'));
const resolvers = mergeResolvers(resolversArray);

async function bootstrap() {

  // 1. Connect to database
  await connectToDatabase(process.env.DATABASE_CONNECTION_URL);
  console.log('Connected to MongoDB!')

  // 2. Create GraphQL server instance
  const yoga = createYoga({
    maskedErrors: false,
    schema: createSchema({
      typeDefs: typeDefs,
      resolvers: resolvers,
    }),
    context: {
      dataSources: {
        categoryDS: new CategoryRestDataSource(),
        productDS: new ProductRestDataSource(),
      }
    }
  });


  // 3. Create HTTP server
  const httpServer = createServer(yoga);

  // 4. Start the server
  httpServer.listen(4004, () => {
    console.log('Server is running. Head to http://localhost:4004/graphql');
  });

}

bootstrap();
