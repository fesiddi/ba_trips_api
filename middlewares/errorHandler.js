import { AppError } from '../utils/errors.js';
import logger from '../utils/logger.js';

const errorHandler = (err, req, res, next) => {
    if (err instanceof AppError) {
        res.status(err.statusCode).json({ error: err.message });
    } else {
        logger.error('Internal Server Error:', {
            message: err.message,
            stack: err.stack,
            name: err.name,
            status: err.status,
            statusCode: err.statusCode,
        });
        res.status(500).json({
            error: err.message,
            stack: process.env.NODE_ENV === 'development' ? err.stack : {},
        });
    }
};

export default errorHandler;
