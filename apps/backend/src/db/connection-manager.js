import mongoose from 'mongoose';

export async function connectToDatabase(connectionUrl, isDebugEnabled = false) {
  mongoose.set('debug', isDebugEnabled);

  const { connection } = await mongoose.connect(connectionUrl, {
    autoIndex: process.env.NODE_ENV !== 'production'
  });

  connection.on('error', error => {
    console.error('Error in Mongo connection:', error);
  });

  return connection;
}
