import { expect } from 'chai';
import {
    validateRegister,
    validateLogin,
} from '../../middlewares/validateAuth.js';
import { BadRequestError } from '../../utils/errors.js';

describe('Auth Validation Middleware', () => {
    describe('validateRegister', () => {
        it('should pass validation for valid registration data', () => {
            const req = {
                body: {
                    username: 'testuser',
                    password: 'test123',
                    passwordConf: 'test123',
                    email: 'testuser@gmail.com',
                },
            };
            const res = {};
            const next = () => {};

            expect(() => validateRegister(req, res, next)).to.not.throw();
        });

        it('should throw BadRequestError for missing username', () => {
            const req = {
                body: {
                    password: 'test123',
                    passwordConf: 'test123',
                    email: 'testuser@gmail.com',
                },
            };
            const res = {};
            const next = () => {};

            expect(() => validateRegister(req, res, next)).to.throw(
                BadRequestError
            );
        });

        it('should throw BadRequestError for invalid email', () => {
            const req = {
                body: {
                    username: 'testuser',
                    password: 'test123',
                    passwordConf: 'test123',
                    email: 'invalid-email',
                },
            };
            const res = {};
            const next = () => {};

            expect(() => validateRegister(req, res, next)).to.throw(
                BadRequestError
            );
        });

        it('should throw BadRequestError for missing password confirmation', () => {
            const req = {
                body: {
                    username: 'testuser',
                    password: 'test123',
                    email: 'testuser@gmail.com',
                },
            };
            const res = {};
            const next = () => {};

            expect(() => validateRegister(req, res, next)).to.throw(
                BadRequestError
            );
        });
    });

    describe('validateLogin', () => {
        it('should pass validation for valid login data', () => {
            const req = {
                body: {
                    username: 'testuser',
                    password: 'test123',
                },
            };
            const res = {};
            const next = () => {};

            expect(() => validateLogin(req, res, next)).to.not.throw();
        });

        it('should throw BadRequestError for missing username', () => {
            const req = {
                body: {
                    password: 'test123',
                },
            };
            const res = {};
            const next = () => {};

            expect(() => validateLogin(req, res, next)).to.throw(
                BadRequestError
            );
        });

        it('should throw BadRequestError for missing password', () => {
            const req = {
                body: {
                    username: 'testuser',
                },
            };
            const res = {};
            const next = () => {};

            expect(() => validateLogin(req, res, next)).to.throw(
                BadRequestError
            );
        });
    });
});
