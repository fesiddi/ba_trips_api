import config from './config/env_config.js';
import app from './app.js';
import { connectDB } from './utils/dbConnection.js';
import mongoose from 'mongoose';

connectDB();

// once connected to the db we start the server
mongoose.connection.once('open', () => {
  app.listen(config.PORT, () =>
    console.log(`Trip Manager API listening on port ${config.PORT}!`),
  );
});
