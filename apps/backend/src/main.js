import { connectToDatabase } from './db/connection-manager';

async function bootstrap() {

  // Connect to database
  await connectToDatabase(process.env.DATABASE_CONNECTION_URL);
  console.log('Connected to MongoDB!')


}

bootstrap();
