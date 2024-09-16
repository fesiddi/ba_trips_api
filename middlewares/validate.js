import Joi from 'joi';
import { BadRequestError } from '../utils/errors.js';

const validIATACodes = [
    'ATL',
    'PEK',
    'LAX',
    'DXB',
    'HND',
    'ORD',
    'LHR',
    'PVG',
    'CDG',
    'DFW',
    'AMS',
    'FRA',
    'IST',
    'CAN',
    'JFK',
    'SIN',
    'DEN',
    'ICN',
    'BKK',
    'SFO',
    'LAS',
    'CLT',
    'MIA',
    'KUL',
    'SEA',
    'MUC',
    'EWR',
    'MAD',
    'HKG',
    'MCO',
    'PHX',
    'IAH',
    'SYD',
    'MEL',
    'GRU',
    'YYZ',
    'LGW',
    'BCN',
    'MAN',
    'BOM',
    'DEL',
    'ZRH',
    'SVO',
    'DME',
    'JNB',
    'ARN',
    'OSL',
    'CPH',
    'HEL',
    'VIE',
];

const validateSearch = (req, res, next) => {
    const searchSchema = Joi.object({
        origin: Joi.string()
            .valid(...validIATACodes)
            .required(),
        destination: Joi.string()
            .valid(...validIATACodes)
            .required(),
        sort_by: Joi.string().valid('fastest', 'cheapest').required(),
    });

    const { error } = searchSchema.validate(req.query);
    if (error) {
        throw new BadRequestError(error.details[0].message);
    }
    next();
};

const validateTrip = (req, res, next) => {
    const tripSchema = Joi.object({
        id: Joi.string().required(),
        origin: Joi.string()
            .valid(...validIATACodes)
            .required(),
        destination: Joi.string()
            .valid(...validIATACodes)
            .required(),
        cost: Joi.number().required(),
        duration: Joi.number().required(),
        type: Joi.string(),
        display_name: Joi.string(),
    });

    const { error } = tripSchema.validate(req.body);
    if (error) {
        throw new BadRequestError(error.details[0].message);
    }
    next();
};

export { validateSearch, validateTrip };
