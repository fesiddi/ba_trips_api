import Joi from 'joi';
import { BadRequestError } from '../utils/errors.js';

const validateRegister = (req, res, next) => {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
        passwordConf: Joi.string().required(),
        email: Joi.string().email().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        throw new BadRequestError(error.details[0].message);
    }
    next();
};

const validateLogin = (req, res, next) => {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        throw new BadRequestError('All fields are required');
    }
    next();
};

export { validateRegister, validateLogin };
