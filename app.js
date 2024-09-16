import express from 'express';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import tripRoutes from './routes/tripRoutes.js';
import authRoutes from './routes/authRoutes.js';
import swaggerUi from 'swagger-ui-express';
import logger from './utils/logger.js';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import errorHandler from './middlewares/errorHandler.js';

dotenv.config();

const app = express();

const swaggerDocument = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'swagger.json'), 'utf-8')
);

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});

// Security middleware
app.use(helmet());
app.use(mongoSanitize());

// Middleware
app.use(express.json());

app.use(limiter);

// Log all requests
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

// Routes
app.use('/api', tripRoutes);
app.use('/api/auth', authRoutes);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Error handling middleware
app.use(errorHandler);

export default app;
