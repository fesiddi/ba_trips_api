import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;
const DB_URI =
  process.env.NODE_ENV === 'production'
    ? process.env.PROD_DB_URI
    : process.env.DB_URI;

export default { PORT, DB_URI };
