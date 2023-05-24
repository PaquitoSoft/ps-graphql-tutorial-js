import { createServer } from 'node:http';

import { connectToDatabase } from './db/connection-manager';

import { createAppYoga } from './graphql-server';

async function bootstrap() {

  // 1. Connect to database
  await connectToDatabase(process.env.DATABASE_CONNECTION_URL);
  console.log('Connected to MongoDB!')

  // 2. Create GraphQL server instance
  const yoga = createAppYoga();

  // 3. Create HTTP server
  const httpServer = createServer(yoga);

  // 4. Start the server
  httpServer.listen(4004, () => {
    console.log('Server is running. Head to http://localhost:4004/graphql');
  });

}

bootstrap();
