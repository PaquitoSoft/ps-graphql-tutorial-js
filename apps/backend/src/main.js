import path from 'node:path';
import { readFileSync } from 'node:fs';
import { createServer } from 'node:http';
// import fetch from 'node-fetch';

import { createYoga, createSchema } from 'graphql-yoga';
import { connectToDatabase } from './db/connection-manager';

const typeDefs = readFileSync(path.join(__dirname, './schema.graphql'), 'utf8');

async function bootstrap() {

  // 1. Connect to database
  await connectToDatabase(process.env.DATABASE_CONNECTION_URL);
  console.log('Connected to MongoDB!')

  // 2. Create GraphQL server instance
  const yoga = createYoga({
    // maskedErrors: false,
    schema: createSchema({
      typeDefs: typeDefs,
      resolvers: {
        Query: {
          hello: async (parent, params, context, info) => {
            return `Hello ${params.name}!`;
          }
        }
      }
    })
  });


  // 3. Create HTTP server
  const httpServer = createServer(yoga);

  // 4. Start the server
  httpServer.listen(4004, () => {
    console.log('Server is running. Head to http://localhost:4004/graphql');
  });

}

bootstrap();
